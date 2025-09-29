import { Module } from '@nestjs/common';
import { TestNotificationsService } from './test-notifications.service';
import { TestNotificationsController } from './test-notifications.controller';
import { NotificationProvidersModule } from 'src/notifications/notification.module';

@Module({
  imports: [NotificationProvidersModule],
  providers: [TestNotificationsService],
  controllers: [TestNotificationsController],
})
export class TestNotificationsModule {}
