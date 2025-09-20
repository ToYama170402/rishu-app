import * as fs from "node:fs";
import type { Department } from "./course";
import { facultyMap } from "./course";
import { Logger } from "./logger";
import { PuppeteerClient } from "./resourceClient/browserClient/puppeteerClient";
import { TimeRangeScheduler } from "./scheduler/timeRangeScheduler";
import { CheerioDOMParser } from "./scraping/adapters";
import { FacultyParser } from "./scraping/commonParser/facultyParser";
import { InstructorParser } from "./scraping/commonParser/instructorParser";
import { ScheduleParser } from "./scraping/commonParser/scheduleParser";
import { SemesterParser } from "./scraping/commonParser/semesterParser";
import { SingleTextExtractor } from "./scraping/core/singleTextExtractor";
import {
  SyllabusParser,
  type SyllabusParserInput,
} from "./scraping/syllabus/parser";
import { SyllabusScraper } from "./scraping/syllabus/scraper";
import { SYLLABUS_SELECTORS } from "./scraping/syllabus/selectors";
import { SyllabusSearchResultExtractor } from "./scraping/syllabusSearchEngineResult/extractor";
import { SyllabusSearchResultParser } from "./scraping/syllabusSearchEngineResult/parser";
import { SyllabusSearchResultScraper } from "./scraping/syllabusSearchEngineResult/scraper";
import { CourseService } from "./services/courseService";
import { JsonFileCourseRepositoryAdapter } from "./storage/adapters";
import { CourseRepository } from "./storage/repositories";

const logger = Logger.getInstance();

const logFile = "./data/log";
logger.setOutput(async (msg, level) => {
  await fs.promises.appendFile(logFile, `${msg}\n`, { flag: "a" });
});

async function scrapeSyllabus(syllabusUrl: string) {
  const scraper = new SyllabusScraper({
    timeout: 10000,
    retries: 3,
    delay: 1000,
    userAgent: "Mozilla/5.0",
  });
  const browserClient = new PuppeteerClient();
  const { data } = await scraper.scrape(
    Object.assign(browserClient, {
      syllabusUrl: `https://eduweb.sta.kanazawa-u.ac.jp${syllabusUrl}`,
    })
  );
  browserClient.close();
  const cheerioDOMParser = CheerioDOMParser.fromHtml(data);
  const extractedData = Object.entries(SYLLABUS_SELECTORS)
    .map(([key, selector]) => {
      const singleTextExtractor = new SingleTextExtractor(key, selector);
      return { key, data: singleTextExtractor.extract(cheerioDOMParser).data };
    })
    .reduce(
      (acc, curr) => {
        switch (curr.key) {
          case "instructors": {
            const instructorParser = new InstructorParser();
            acc[curr.key] = instructorParser.parse(curr.data).data;
            break;
          }
          case "schedule": {
            const scheduleParser = new ScheduleParser();
            acc[curr.key] = scheduleParser.parse(curr.data).data;
            break;
          }
          case "semester": {
            const semesterParser = new SemesterParser();
            acc[curr.key] = semesterParser.parse(curr.data).data;
            break;
          }
          default:
            acc[curr.key] = curr.data;
        }
        return acc;
      },
      {} as Record<string, unknown>
    );
  const syllabusParser = new SyllabusParser();
  try {
    return syllabusParser.parse(extractedData as SyllabusParserInput);
  } catch (error) {
    logger.log(`Error parsing syllabus: ${error}`, "error");
    logger.log(
      `Stack trace: ${error instanceof Error ? error.stack : "no stack"}`,
      "error"
    );
    logger.log(`Syllabus URL: ${syllabusUrl}`, "error");
    logger.log(
      `Extracted Data: ${JSON.stringify(extractedData, null, 2)}`,
      "error"
    );
    return null;
  }
}

async function scrapeSyllabusSearchResult(department: Department) {
  const scraper = new SyllabusSearchResultScraper({
    timeout: 10000,
    retries: 3,
    delay: 1000,
    userAgent: "Mozilla/5.0",
  });
  const browserClient = new PuppeteerClient();
  const { data } = await scraper.scrape(
    Object.assign(browserClient, {
      department: department as Department,
    })
  );
  browserClient.close();

  const cheerioDOMParser = CheerioDOMParser.fromHtml(data);
  const syllabusSearchResultExtractor = new SyllabusSearchResultExtractor();
  const extractedData = syllabusSearchResultExtractor.extract(cheerioDOMParser);
  const syllabusSearchResultData = extractedData.data.slice(1).map((item) => {
    try {
      const facultyParser = new FacultyParser();
      const faculty = facultyParser.parse({
        faculty: item[4]?.split(/\n/)[1] || "",
        department: item[4]?.split(/\n/)[0] || "",
      });

      const instructorParser = new InstructorParser();
      const parsedInstructors = instructorParser.parse(item[5] || "");

      const semesterParser = new SemesterParser();
      const parsedSemester = semesterParser.parse(item[6] || "");

      const scheduleParser = new ScheduleParser();
      const parsedSchedule = scheduleParser.parse(item[7] || "");

      const syllabusSearchResultParser = new SyllabusSearchResultParser();
      return syllabusSearchResultParser.parse({
        courseNumber: item[1] || "",
        japaneseUrl: item[2] || "",
        englishUrl: item[3] || "",
        faculty: faculty.data,
        title: item[4]?.split(/\n/)[2] ?? "",
        instructors: parsedInstructors.data,
        semester: parsedSemester.data,
        schedule: parsedSchedule.data,
      }).data;
    } catch (error) {
      logger.log(`Error parsing syllabus search result: ${error}`, "error");
      logger.log(
        `Stack trace: ${error instanceof Error ? error.stack : "no stack"}`,
        "error"
      );
      logger.log(`Item Data: ${JSON.stringify(item, null, 2)}`, "error");
      return null;
    }
  });
  return syllabusSearchResultData;
}

logger.log("start scraping syllabus...");

const timeRangeScheduler = new TimeRangeScheduler(
  23,
  3,
  () => (50 + Math.random() * 20) * 1000
);

const courseService = new CourseService();
const jsonFileCourseRepositoryAdapter = new JsonFileCourseRepositoryAdapter(
  "./data/courses.json"
);
const courseRepository = new CourseRepository(jsonFileCourseRepositoryAdapter);

Object.keys(facultyMap).forEach((key) => {
  timeRangeScheduler.addTask(async () => {
    try {
      const syllabusSearchResults = await scrapeSyllabusSearchResult(
        key as Department
      );
      syllabusSearchResults
        .filter((e) => e !== null)
        .forEach((syllabusSearchResult) => {
          timeRangeScheduler.addTask(async () => {
            try {
              const syllabusData = await scrapeSyllabus(
                syllabusSearchResult?.japaneseUrl || ""
              );
              if (!syllabusData) return;
              const course = courseService.createCourseFromSyllabusData(
                syllabusData.data,
                syllabusSearchResult,
                2025,
                syllabusData.data.courseDescription
              );

              await courseRepository.saveCourse(course);
            } catch (error) {
              logger.log(`Error scraping syllabus: ${error}`, "error");
              logger.log(
                `Stack trace: ${error instanceof Error ? error.stack : "no stack"}`,
                "error"
              );
              logger.log(
                `Error occurred at: ${JSON.stringify(syllabusSearchResult, null, 2)}`,
                "error"
              );
            }
          });
        });
    } catch (error) {
      logger.log(`Error scraping syllabus search results: ${error}`, "error");
      logger.log(
        `Stack trace: ${error instanceof Error ? error.stack : "no stack"}`,
        "error"
      );
      logger.log(`Faculty: ${key}`, "error");
    }
  });
});

timeRangeScheduler.start();
