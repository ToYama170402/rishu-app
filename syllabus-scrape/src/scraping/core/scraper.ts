export interface ScrapingConfig {
  timeout: number;
  retries: number;
  delay: number;
  userAgent: string;
  headers?: Record<string, string>;
}

export interface ScrapingResult<T> {
  data: T;
  metadata: {
    url: string;
    timestamp: Date;
    processingTime: number;
    success: boolean;
  };
}

export abstract class BaseScraper<TInput, TOutput> {
  protected config: ScrapingConfig;

  constructor(config: ScrapingConfig) {
    this.config = config;
  }

  abstract scrape(input: TInput): Promise<ScrapingResult<TOutput>>;

  protected async measurePerformance<T>(
    operation: () => Promise<T>
  ): Promise<{ result: T; duration: number }> {
    const startTime = Date.now();
    const result = await operation();
    const duration = Date.now() - startTime;
    return { result, duration };
  }

  protected createResult<T>(
    data: T,
    url: string,
    processingTime: number,
    success: boolean = true
  ): ScrapingResult<T> {
    return {
      data,
      metadata: {
        url,
        timestamp: new Date(),
        processingTime,
        success,
      },
    };
  }

  protected async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected log(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ): void {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${this.constructor.name}] ${message}`);
  }
}
