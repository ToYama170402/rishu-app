import type { Scheduler, TaskPayload } from "./core";

export class TimeRangeScheduler implements Scheduler {
  private tasks: TaskPayload[] = [];
  private isRunning: boolean = false;
  private workers: Record<string, (taskPayload: unknown) => Promise<void>> = {};

  constructor(
    private startHour: number,
    private endHour: number,
    private intervalMs: number | (() => number)
  ) {}

  addTask(task: TaskPayload): void {
    this.tasks.push(task);
  }

  start(): void {
    this.isRunning = true;
    this.runTasks();
  }

  stop(): void {
    this.isRunning = false;
  }

  addWorker(
    name: string,
    processor: (taskPayload: unknown) => Promise<void>
  ): void {
    if (this.workers[name]) {
      throw new Error(`Worker with name ${name} already exists.`);
    }
    this.workers[name] = processor;
  }

  private async runTasks(): Promise<void> {
    while (this.isRunning) {
      const now = new Date().getHours();
      if (this.tasks.length > 0 && this.isInTimeRange(now)) {
        const task = this.tasks.shift();
        if (task) {
          const worker = this.workers[task.type];
          if (worker) {
            try {
              await worker(task.payload);
            } catch (error) {
              console.error(`Error processing task: ${error}`);
            }
          } else {
            console.warn(`No worker found for task type: ${task.type}`);
          }
        }
      }
      await this.sleep(
        typeof this.intervalMs === "function"
          ? this.intervalMs()
          : this.intervalMs
      );
    }
  }
  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isInTimeRange(now: number): boolean {
    if (this.startHour < this.endHour) {
      //日付をまたがない場合
      return now >= this.startHour && now < this.endHour;
    } else {
      //日付をまたぐ場合
      return now >= this.startHour || now < this.endHour;
    }
  }
}
