import {
  Queue,
  Worker,
  type ConnectionOptions,
  type RateLimiterOptions,
} from "bullmq";
import type { Scheduler, TaskPayload } from "./core";

export class BullMQScheduler implements Scheduler {
  private workers: Record<string, Worker> = {};
  private queues: Record<string, Queue> = {};
  private redisConfig: ConnectionOptions;

  constructor(connectionOpts: ConnectionOptions) {
    this.redisConfig = connectionOpts;
  }

  async addWorker<DataType>(
    name: string,
    processor: (taskPayload: DataType) => Promise<void>,
    limiter?: RateLimiterOptions
  ) {
    if (this.workers[name]) {
      throw new Error(`Worker with name ${name} already exists.`);
    }
    this.queues[name] = new Queue<DataType>(name, {
      connection: this.redisConfig,
    });
    this.workers[name] = new Worker<DataType>(
      name,
      (job) => processor(job.data),
      {
        limiter: limiter ?? {
          max: 1,
          duration: 10000,
        },
        connection: this.redisConfig,
      }
    );
    await this.workers[name].pause();
  }

  addTask(task: TaskPayload): void {
    const queue = this.queues[task.type];
    if (!queue) {
      throw new Error("No workers available to add tasks.");
    }
    queue.add(task.type, task.payload);
  }
  start(): void {
    for (const worker of Object.values(this.workers)) {
      worker.resume();
    }
  }
  async stop(): Promise<void> {
    const workers = Object.values(this.workers);
    const queues = Object.values(this.queues);

    await Promise.all(workers.map((worker) => worker.pause()));
    await Promise.all([
      ...workers.map((worker) => worker.close()),
      ...queues.map((queue) => queue.close()),
    ]);

    this.workers = {};
    this.queues = {};
  }
}
