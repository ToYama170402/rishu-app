export interface BrowserClient {
  init(): Promise<void>;
  goto(url: string): Promise<void>;
  evaluate<T>(
    pageFunction: (...args: unknown[]) => T,
    args: unknown[]
  ): Promise<T>;
  savePageAsHTML(): Promise<string>;
  close(): Promise<void>;
}
