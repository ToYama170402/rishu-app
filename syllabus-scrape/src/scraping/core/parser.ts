export interface ParseResult<T> {
  data: T;
  warnings: string[];
  errors: string[];
  parseTime: number;
}

export interface ParsingContext {
  url?: string;
  encoding?: string;
  selector?: string;
  metadata?: Record<string, any>;
}

export abstract class BaseParser<TInput, TOutput> {
  protected warnings: string[] = [];
  protected errors: string[] = [];

  abstract parse(input: TInput, context?: ParsingContext): ParseResult<TOutput>;

  protected measureParseTime<T>(operation: () => T): {
    result: T;
    duration: number;
  } {
    const startTime = Date.now();
    const result = operation();
    const duration = Date.now() - startTime;
    return { result, duration };
  }

  protected addWarning(message: string): void {
    this.warnings.push(message);
    this.log(`Warning: ${message}`, "warn");
  }

  protected addError(message: string): void {
    this.errors.push(message);
    this.log(`Error: ${message}`, "error");
  }

  protected createParseResult<T>(data: T, parseTime: number): ParseResult<T> {
    return {
      data,
      warnings: [...this.warnings],
      errors: [...this.errors],
      parseTime,
    };
  }

  protected clearMessages(): void {
    this.warnings = [];
    this.errors = [];
  }

  protected extractText(element: any, selector?: string): string {
    // 基本的なテキスト抽出（実装は具象クラスで）
    // パラメータを使用して警告を回避
    if (!element && selector) return "";
    return "";
  }

  protected extractArray(elements: any, selector?: string): string[] {
    // 基本的な配列抽出（実装は具象クラスで）
    // パラメータを使用して警告を回避
    if (!elements && selector) return [];
    return [];
  }

  protected extractNumber(
    element: any,
    selector?: string,
    defaultValue: number = 0
  ): number {
    const text = this.extractText(element, selector);
    const number = parseFloat(text.replace(/[^0-9.-]/g, ""));
    return isNaN(number) ? defaultValue : number;
  }

  protected sanitizeText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[\r\n\t]/g, " ");
  }

  protected log(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ): void {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${this.constructor.name}] ${message}`);
  }

  protected validateRequired(value: any, fieldName: string): boolean {
    if (value === null || value === undefined || value === "") {
      this.addError(`必須フィールドが不足しています: ${fieldName}`);
      return false;
    }
    return true;
  }

  protected validateFormat(
    value: string,
    pattern: RegExp,
    fieldName: string
  ): boolean {
    if (!pattern.test(value)) {
      this.addWarning(
        `フォーマットが正しくありません: ${fieldName} = ${value}`
      );
      return false;
    }
    return true;
  }
}
