import type { Scheduler, Task } from "./core";

export class TimeRangeScheduler implements Scheduler {
  private tasks: Task[] = [];
  private isRunning: boolean = false;

  constructor(
    private startHour: number,
    private endHour: number,
    private intervalMs: number
  ) {}

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  start(): void {
    this.isRunning = true;
    this.runTasks();
  }

  stop(): void {
    this.isRunning = false;
  }

  private async runTasks(): Promise<void> {
    while (this.isRunning) {
      const now = new Date().getHours();
      if (this.tasks.length > 0 && this.isInTimeRange(now)) {
        const task = this.tasks.shift();
        if (task) {
          await task();
        }
      }
      await this.sleep(this.intervalMs);
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
