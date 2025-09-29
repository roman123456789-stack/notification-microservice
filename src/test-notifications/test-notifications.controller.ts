import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendNotificationDTO } from './dto/send-notification.dto';
import { NotificationProvidersService } from 'src/notifications/notifications.service';

@Controller('test-notifications')
export class TestNotificationsController {
  constructor(
    private readonly notificationProvidersService: NotificationProvidersService,
  ) {}
  @Post()
  async sendNotification(@Body() dto: SendNotificationDTO) {
    return await this.notificationProvidersService.send(dto);
  }
}
