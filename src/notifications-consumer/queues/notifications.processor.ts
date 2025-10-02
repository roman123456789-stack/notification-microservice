import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationProvidersService } from '../../notifications/notifications.service';
import { SendNotificationParameters } from '../../notifications/interfaces/send-notification.interface';

@Processor('notifications-queue', {
  concurrency: 5,
})
export class NotificationsProcessor extends WorkerHost {
  constructor(
    private readonly notificationProvidersService: NotificationProvidersService,
  ) {
    super();
  }

  async process(job: Job<SendNotificationParameters>): Promise<any> {
    const { id, name, data } = job;
    logger.debug(`Processing notification sending job: job=${id}, type=${name}`);

    try {
      await this.notificationProvidersService.send(data);
      return { success: true, jobId: id };
    } catch (error) {
      logger.error(`Error in job ${id}: ${error.message}`, 'NotificationsProcessor.process');
      throw error;
    }
  }
}