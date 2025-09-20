export type Task = () => Promise<void> | void;

export interface Scheduler {
  addTask(task: Task): void;
  start(): void;
  stop(): void;
}
