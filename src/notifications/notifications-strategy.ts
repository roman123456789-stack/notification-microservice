import { Injectable } from '@nestjs/common';
import { NotificationsProvider } from './interfaces/notification-provider.interface';
import { GmailProvider } from './providers/gmail.provider';
import { NotificationsProviderEnum } from './enums/notification-providers.enum';
import { SendNotificationParameters } from './interfaces/send-notification.interface';
import { MailProvider } from './providers/mail.provider';

@Injectable()
export class NotificationsStrategy {
  private providers: Map<NotificationsProviderEnum, NotificationsProvider>;

  constructor(
    private readonly gmailProvider: GmailProvider,
    private readonly mailProvider: MailProvider,
  ) {
    this.providers = new Map();
    this.providers.set(NotificationsProviderEnum.GMAIL, this.gmailProvider);
    this.providers.set(NotificationsProviderEnum.MAIL, this.mailProvider);
  }

  getProvider(type: NotificationsProviderEnum): NotificationsProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`Provider ${type} not found`);
    }
    return provider;
  }

  async send(options: SendNotificationParameters): Promise<boolean> {
    const provider = this.getProvider(options.type);

    return provider.send(options);
  }
}
