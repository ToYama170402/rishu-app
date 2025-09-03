import puppeteer, { type Browser, type Page } from "puppeteer";
import type { BrowserClient } from "../core/browserClient";

export class PuppeteerClient implements BrowserClient {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init(): Promise<void> {
    if (this.browser) {
      await this.close();
    }
    this.browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();
  }

  async goto(url: string): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized");
    try {
      await this.page.goto(url);
    } catch (err) {
      throw new Error(
        `Failed to navigate to ${url}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async evaluate<T>(
    pageFunction: (...args: unknown[]) => T,
    args: unknown[] = []
  ): Promise<T> {
    if (!this.page) throw new Error("Page is not initialized");
    try {
      const returnValue = await this.page.evaluate(pageFunction, ...args);
      await this.waitForNavigator();
      return returnValue;
    } catch (err) {
      throw new Error(
        `Failed to evaluate page function: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async savePageAsHTML(): Promise<string> {
    if (!this.page) throw new Error("Page is not initialized");
    try {
      return await this.page.content();
    } catch (err) {
      throw new Error(
        `Failed to save page content: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  private async waitForNavigator(): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized");
    try {
      await this.page.waitForNavigation();
    } catch (err) {
      throw new Error(
        `Failed to wait for navigation: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}
