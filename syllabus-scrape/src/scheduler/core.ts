export type TaskPayload = {
  type: string;
  payload: unknown;
};

export interface Scheduler {
  addWorker(
    name: string,
    processor: (taskPayload: unknown) => Promise<void>
  ): void;
  addTask(task: TaskPayload): void;
  start(): void;
  stop(): void;
}
