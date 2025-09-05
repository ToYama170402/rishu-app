import type { Department } from "@/course";
import type { BrowserClient } from "@/resourceClient/core/browserClient";
import { BaseScraper, type ScrapingResult } from "../core";

const SYLLABUS_SEARCH_ENGINE_URL =
  "https://eduweb.sta.kanazawa-u.ac.jp/portal/Public/Syllabus/SearchMain.aspx";

export class SyllabusSearchResultScraper extends BaseScraper<
  BrowserClient,
  string
> {
  departmentSelectSelector = "#ctl00_phContents_ddl_fac";
  searchButtonSelector = "#ctl00_phContents_ctl06_btnSearch";
  itemsPerPageSelector = "#ctl00_phContents_ucGrid_ddlLines";
  async scrape(
    input: BrowserClient & { department: Department }
  ): Promise<ScrapingResult<string>> {
    const { result, duration } = await this.measurePerformance(async () => {
      await input.init();
      await input.goto(SYLLABUS_SEARCH_ENGINE_URL);

      await input.evaluate(
        async (departmentSelectSelector, searchButtonSelector, department) => {
          // ページの読み込み完了まで待つ
          await new Promise<void>((resolve) => {
            ((self) => {
              if (document.readyState === "complete") {
                resolve();
              } else {
                setTimeout(self(self), 100);
              }
            })((self) => {
              if (document.readyState === "complete") {
                resolve();
              } else {
                setTimeout(self(self), 100);
              }
            });
          });
          const departmentSelect = document.querySelector(
            departmentSelectSelector as string
          );
          if (!departmentSelect) {
            throw new Error("Department select element not found");
          }
          if (!(departmentSelect instanceof HTMLSelectElement)) {
            throw new Error("Department select element is not a select");
          }
          const departmentOption = Array.from(
            departmentSelect.querySelectorAll("option")
          ).find((option) => option.textContent === department);
          if (!departmentOption) {
            throw new Error("Department option not found");
          }
          departmentSelect.value = departmentOption.value;

          const searchButton = document.querySelector(
            searchButtonSelector as string
          );
          if (!searchButton) {
            throw new Error("Search button not found");
          }
          if (!(searchButton instanceof HTMLInputElement)) {
            throw new Error("Search button is not a button");
          }
          searchButton.click();
        },
        [
          "#ctl00_phContents_ddl_fac",
          "#ctl00_phContents_ctl06_btnSearch",
          "融合学域",
        ]
      );
      // ページ遷移が発生するためevaluateを分割
      await input.evaluate(
        async (itemsPerPageSelector: unknown) => {
          await new Promise<void>((resolve) => {
            ((self) => {
              if (document.readyState === "complete") {
                resolve();
              } else {
                setTimeout(self(self), 100);
              }
            })((self) => {
              if (document.readyState === "complete") {
                resolve();
              } else {
                setTimeout(self(self), 100);
              }
            });
          });
          const itemsPerPageSelect = document.querySelector(
            itemsPerPageSelector as string
          );
          if (!itemsPerPageSelect) {
            throw new Error("Items per page select element not found");
          }
          if (!(itemsPerPageSelect instanceof HTMLSelectElement)) {
            throw new Error("Items per page select element is not a select");
          }
          itemsPerPageSelect.value = "0";
          itemsPerPageSelect.dispatchEvent(new Event("change"));
        },
        ["#ctl00_phContents_ucGrid_ddlLines"]
      );

      return input.savePageAsHTML();
    });
    return this.createResult<string>(
      result,
      SYLLABUS_SEARCH_ENGINE_URL,
      duration
    );
  }
}
