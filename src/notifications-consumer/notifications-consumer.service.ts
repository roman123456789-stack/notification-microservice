import { Injectable } from '@nestjs/common';
import { CreateNotificationsConsumerDto } from './dto/create-notifications-consumer.dto';
import { NotificationsProviderEnum } from 'src/notifications/enums/notification-providers.enum';
import { NotificationsQueue } from './queues/notifications.queue';

@Injectable()
export class NotificationsConsumerService {
  constructor(
    private readonly notificationsQueue: NotificationsQueue,
  ) {}

  async sendRegisteredNotification(
    createNotificationsConsumerDto: CreateNotificationsConsumerDto,
  ) {
    try {
      const { firstName, lastName } =
        createNotificationsConsumerDto.user;
      const displayName = firstName || lastName || 'user';
      const message = `Dear ${displayName}, thank you for registering on our service.`;
      
      logger.debug(`Adding job to queue for ${createNotificationsConsumerDto.user.email}`);
      
      const job = await this.notificationsQueue.addJob({
        type: NotificationsProviderEnum.GMAIL,
        to: createNotificationsConsumerDto.user.email,
        message,
      });

      logger.debug(`Job added to queue with ID: ${job.id}`);
      return true;
    } catch (error) {
      logger.error(`Error adding job to queue: ${error.message}`, 'NotificationsConsumerService.sendRegisteredNotification');
      return false;
    }
  }
}
