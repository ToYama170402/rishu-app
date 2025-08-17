export interface BrowserClient {
  init(): Promise<void>;
  goto(url: string): Promise<void>;
  savePageAsHTML(): Promise<string>;
  close(): Promise<void>;
}
