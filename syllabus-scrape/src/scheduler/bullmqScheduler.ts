import { Queue, Worker, type ConnectionOptions } from "bullmq";
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
    maxTaskPerMinute?: number
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
        limiter: {
          max: maxTaskPerMinute ? 1 : Infinity,
          duration: 60000 / (maxTaskPerMinute ?? 1),
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
    await Promise.all(
      Object.values(this.workers).map((worker) => worker.pause())
    );
  }
}
