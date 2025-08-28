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

          // 学域を選択する要素を取得
          const departmentSelect = document.querySelector(
            departmentSelectSelector as string
          );
          if (!departmentSelect) {
            throw new Error("Department select element not found");
          }
          if (!(departmentSelect instanceof HTMLSelectElement)) {
            throw new Error("Department select element is not a select");
          }

          // 学域を選択する
          const departmentOption = Array.from(
            departmentSelect.querySelectorAll("option")
          ).find((option) => option.textContent === department);
          if (!departmentOption) {
            throw new Error("Department option not found");
          }
          departmentSelect.value = departmentOption.value;

          // 検索する
          const searchButton = document.querySelector(
            searchButtonSelector as string
          );
          if (!searchButton) {
            throw new Error("Search button not found");
          }
          if (!(searchButton instanceof HTMLButtonElement)) {
            throw new Error("Search button is not a button");
          }
          searchButton.click();
          await ready();

          // 表示件数を設定する
          const itemsPerPageSelect = document.querySelector(
            itemsPerPageSelector as string
          );
          if (!itemsPerPageSelect) {
            throw new Error("Items per page select element not found");
          }
          if (!(itemsPerPageSelect instanceof HTMLSelectElement)) {
            throw new Error("Items per page select element is not a select");
          }
          itemsPerPageSelect.value = "0"; // 全件表示に設定
          itemsPerPageSelect.dispatchEvent(new Event("change")); // 全件表示に変更
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
    return this.createResult<string>(
      result,
      SYLLABUS_SEARCH_ENGINE_URL,
      duration
    );
  }
}
