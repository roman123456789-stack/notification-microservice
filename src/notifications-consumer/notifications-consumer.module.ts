import { Module } from '@nestjs/common';
import { NotificationsConsumerService } from './notifications-consumer.service';
import { NotificationsConsumerController } from './notifications-consumer.controller';
import { NotificationProvidersModule } from 'src/notifications/notification.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsProcessor } from './queues/notifications.processor';
import { NotificationsQueue } from './queues/notifications.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications-queue'
    }),
    NotificationProvidersModule
  ],
  controllers: [NotificationsConsumerController],
  providers: [NotificationsConsumerService, NotificationsProcessor, NotificationsQueue],
})
export class NotificationsConsumerModule {}
