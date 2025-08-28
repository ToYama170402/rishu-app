import type { BrowserClient } from "@/resourceClient/core/browserClient";
import { BaseScraper, type ScrapingResult } from "../core";

export class SyllabusScraper extends BaseScraper<BrowserClient, string> {
  async scrape(
    input: BrowserClient & { syllabusUrl: string }
  ): Promise<ScrapingResult<string>> {
    const { result, duration } = await this.measurePerformance(async () => {
      await input.init();
      await input.goto(input.syllabusUrl);
      return input.savePageAsHTML();
    });
    return this.createResult<string>(result, input.syllabusUrl, duration);
  }
}
