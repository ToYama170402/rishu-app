import * as cheerio from "cheerio";
import type { DOMElement, DOMParser } from "@/scraping/core";

/**
 * CheerioのAPIをDOMElementインターフェースに適合させるアダプター
 */
export class CheerioDOMElement implements DOMElement {
  constructor(private $element: cheerio.Cheerio<any>) {}

  text(): string {
    return this.$element.text();
  }

  attr(name: string): string | undefined {
    return this.$element.attr(name);
  }

  find(selector: string): DOMElement[] {
    const elements: DOMElement[] = [];
    this.$element.find(selector).each((_index, element) => {
      const $element = cheerio.load("")(element);
      elements.push(new CheerioDOMElement($element));
    });
    return elements;
  }

  each(callback: (index: number, element: DOMElement) => void): void {
    this.$element.each((index, element) => {
      const $element = cheerio.load("")(element);
      callback(index, new CheerioDOMElement($element));
    });
  }

  length(): number {
    return this.$element.length;
  }
}

/**
 * CheerioのAPIをDOMParserインターフェースに適合させるアダプター
 */
export class CheerioDOMParser implements DOMParser {
  constructor(private $: cheerio.CheerioAPI) {}

  find(selector: string): DOMElement[] {
    const elements: DOMElement[] = [];
    this.$(selector).each((_index, element) => {
      const $element = this.$(element);
      elements.push(new CheerioDOMElement($element));
    });
    return elements;
  }

  findFirst(selector: string): DOMElement | null {
    const $element = this.$(selector).first();
    return $element.length > 0 ? new CheerioDOMElement($element) : null;
  }

  /**
   * CheerioAPIから直接DOMParserを作成するファクトリーメソッド
   */
  static fromHtml(html: string): CheerioDOMParser {
    const $ = cheerio.load(html);
    return new CheerioDOMParser($);
  }

  /**
   * CheerioAPIオブジェクトから作成するファクトリーメソッド
   */
  static fromCheerio($: cheerio.CheerioAPI): CheerioDOMParser {
    return new CheerioDOMParser($);
  }
}
