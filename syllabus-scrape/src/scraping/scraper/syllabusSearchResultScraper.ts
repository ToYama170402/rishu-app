import type { Department } from "@/course";
import type { BrowserClient } from "@/resourceClient/core/browserClient";
import { BaseScraper, type ScrapingResult } from "../core";
import { syllabusSearchEngineUrl } from "./urls";

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
      await input.goto(syllabusSearchEngineUrl);
      await input.evaluate(
        async (
          departmentSelectSelector,
          searchButtonSelector,
          itemsPerPageSelector,
          department
        ) => {
          // Wait for the page to load completely
          const READY_STATE_CHECK_INTERVAL = 100;
          const ready = async () =>
            new Promise<void>((resolve) => {
              const checkReadyState = () => {
                if (document.readyState === "complete") {
                  resolve();
                } else {
                  setTimeout(checkReadyState, READY_STATE_CHECK_INTERVAL);
                }
              };
              checkReadyState();
            });
          await ready();

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

          if (!searchButton) {
            throw new Error("Search button not found");
          }
          if (!(searchButton instanceof HTMLButtonElement)) {
            throw new Error("Search button is not a button");
          }
          searchButton.click();
          await ready();

          const itemsPerPageSelect = document.querySelector(
            itemsPerPageSelector as string
          );
          if (!itemsPerPageSelect) {
            throw new Error("Items per page select element not found");
          }
          if (!(itemsPerPageSelect instanceof HTMLSelectElement)) {
            throw new Error("Items per page select element is not a select");
          }
          itemsPerPageSelect.value = "0"; // Set items per page to all
          itemsPerPageSelect.dispatchEvent(new Event("change"));
          await ready();
        },
        [
          this.departmentSelectSelector,
          this.searchButtonSelector,
          this.itemsPerPageSelector,
          input.department,
        ]
      );
      return input.savePageAsHTML();
    });
    return this.createResult<string>(result, syllabusSearchEngineUrl, duration);
  }
}
