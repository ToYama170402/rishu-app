import {
  BaseExtractor,
  type DOMParser,
  type ExtractionContext,
} from "@/scraping/core";

export class SingleTextExtractor extends BaseExtractor<string> {
  private fieldName: string;
  private selector: string;

  constructor(fieldName: string, selector: string) {
    super(fieldName + "Extractor");
    this.fieldName = fieldName;
    this.selector = selector;
  }

  extract(
    parser: DOMParser,
    selector: string = this.selector,
    context?: ExtractionContext
  ) {
    const warnings: string[] = [];
    const errors: string[] = [];
    const { result, duration } = this.measureExtraction(() =>
      this.extractSingleText(parser, selector, warnings, errors, this.fieldName)
    );
    const elementsFound = result ? 1 : 0;
    const confidence = elementsFound ? 1.0 : 0.5;
    return this.createExtractionResult(
      result,
      duration,
      elementsFound,
      warnings,
      errors,
      confidence
    );
    // DOM操作を抽象化したインターフェース
  }

  protected extractSingleText(
    parser: DOMParser,
    selector: string,
    warnings: string[],
    errors: string[],
    fieldName: string
  ): string {
    const element = parser.findFirst(selector);
    if (element) {
      return this.sanitizeText(this.extractText(element));
    } else {
      this.addWarning(
        warnings,
        `${fieldName}要素が見つかりません: ${selector}`
      );
      return "";
    }
  }
}
