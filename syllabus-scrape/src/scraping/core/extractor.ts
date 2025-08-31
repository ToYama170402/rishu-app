// DOM操作を抽象化したインターフェース
export interface DOMElement {
  text(): string;
  attr(name: string): string | undefined;
  find(selector: string): DOMElement[];
  each(callback: (index: number, element: DOMElement) => void): void;
  length(): number;
}

export interface DOMParser {
  find(selector: string): DOMElement[];
  findFirst(selector: string): DOMElement | null;
}

export interface ExtractionContext {
  url?: string;
  pageType?: string;
  metadata?: Record<string, unknown>;
}

export interface ExtractionResult<T> {
  data: T;
  warnings: string[];
  errors: string[];
  confidence: number; // 0-1の信頼度
  metadata: {
    extractorName: string;
    processingTime: number;
    elementsFound: number;
  };
}

export abstract class BaseExtractor<TOutput> {
  protected extractorName: string;

  constructor(extractorName?: string) {
    this.extractorName = extractorName || this.constructor.name;
  }

  abstract extract(
    parser: DOMParser,
    selector?: string,
    context?: ExtractionContext
  ): ExtractionResult<TOutput>;

  protected createExtractionResult<T>(
    data: T,
    processingTime: number,
    elementsFound: number = 0,
    warnings: string[] = [],
    errors: string[] = [],
    confidence: number = 1.0
  ): ExtractionResult<T> {
    return {
      data,
      warnings,
      errors,
      confidence,
      metadata: {
        extractorName: this.extractorName,
        processingTime,
        elementsFound,
      },
    };
  }

  protected measureExtraction<T>(operation: () => T): {
    result: T;
    duration: number;
  } {
    const startTime = performance.now();
    const result = operation();
    const duration = performance.now() - startTime;
    return { result, duration };
  }

  protected extractText(element: DOMElement): string {
    return element.text().trim();
  }

  protected extractAttribute(
    element: DOMElement,
    attribute: string
  ): string | undefined {
    return element.attr(attribute);
  }

  protected extractNumber(element: DOMElement): number {
    const text = this.extractText(element);
    const number = parseInt(text.replace(/[^\d]/g, ""), 10);
    return Number.isNaN(number) ? 0 : number;
  }

  protected extractArray(
    parser: DOMParser,
    selector: string,
    transformer?: (element: DOMElement, index: number) => string
  ): string[] {
    const elements = parser.find(selector);
    const results: string[] = [];

    elements.forEach((element, index) => {
      const value = transformer
        ? transformer(element, index)
        : this.extractText(element);

      if (value.length > 0) {
        results.push(value);
      }
    });

    return results;
  }

  protected sanitizeText(text: string): string {
    return text.replace(/(\s)+/g, "$1").replace(/^\s+|\s+$/g, "");
  }

  protected validateRequired<T>(
    value: T,
    fieldName: string,
    errors: string[]
  ): boolean {
    if (value === null || value === undefined || value === "") {
      errors.push(`Required field '${fieldName}' is missing or empty`);
      return false;
    }
    return true;
  }

  protected addWarning(warnings: string[], message: string): void {
    warnings.push(`[${this.extractorName}] ${message}`);
  }

  protected addError(errors: string[], message: string): void {
    errors.push(`[${this.extractorName}] ${message}`);
  }

  protected calculateConfidence(
    totalExpected: number,
    actualExtracted: number,
    errorCount: number = 0
  ): number {
    if (totalExpected === 0) return 1.0;

    const successRate = actualExtracted / totalExpected;
    const errorPenalty = errorCount * 0.1;

    return Math.max(0, Math.min(1, successRate - errorPenalty));
  }
}
