import { NotificationsProviderEnum } from '../enums/notification-providers.enum';

export interface SendNotificationParameters {
  type: NotificationsProviderEnum;
  to: string;
  message: string;
  subject?: string;
}
