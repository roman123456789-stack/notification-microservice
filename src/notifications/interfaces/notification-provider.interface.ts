import { ProviderSendNotificationParameters } from './provider-send-notification.interface';

export interface NotificationsProvider {
  send(options: ProviderSendNotificationParameters): Promise<boolean>;
}
