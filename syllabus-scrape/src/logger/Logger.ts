type LogLevel = "info" | "warn" | "error";
type LogOutput = (formattedMessage: string, level: LogLevel) => Promise<void>;

export class Logger {
  private static instance: Logger;
  private constructor() {}
  private logOutput: LogOutput = async (msg, level) => console[level](msg);

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setOutput(output: LogOutput) {
    this.logOutput = output;
  }

  async log(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    await this.logOutput(`[${timestamp}] [${level}] ${message}`, level);
  }
}
