import { Injectable } from '@nestjs/common';
import { NotificationsStrategy } from './notifications-strategy';
import { SendNotificationParameters } from './interfaces/send-notification.interface';

@Injectable()
export class NotificationProvidersService {
  constructor(private readonly notificationsStrategy: NotificationsStrategy) {}

  async send(options: SendNotificationParameters) {
    return await this.notificationsStrategy.send(options);
  }
}
