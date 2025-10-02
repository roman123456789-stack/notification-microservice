import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsQueue {
  constructor(
    @InjectQueue('notifications-queue')
    public queue: Queue,
  ) {}

  async addJob(data: any, jobId?: string) {
    return await this.queue.add('send-notification', data, {
      jobId,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000, // 1с, 2с, 4с
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}