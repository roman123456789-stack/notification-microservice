import { ConfigService } from '@nestjs/config';
import { NotificationsProvider } from '../interfaces/notification-provider.interface';
import { createTransporter } from '../configs/gmail.config';
import { Injectable } from '@nestjs/common';
import { ProviderSendNotificationParameters } from '../interfaces/provider-send-notification.interface';

@Injectable()
export class GmailProvider implements NotificationsProvider {
  private transporter;

  constructor(private readonly config: ConfigService) {
    const emailAddress = this.config.getOrThrow<string>('GMAIL_EMAIL_ADDRESS');
    const emailPassword = this.config.getOrThrow<string>(
      'GMAIL_EMAIL_PASSWORD',
    );

    this.transporter = createTransporter(emailAddress, emailPassword);
  }
  async send(options: ProviderSendNotificationParameters): Promise<boolean> {
    try {
      logger.debug(
        `The beginning of sending notification via gmail`,
        'GmailProvider.send',
      );

      await this.transporter.sendMail({
        to: options.to,
        subject: options?.subject || 'Новое уведомление',
        html: options.message,
      });

      logger.debug(
        `The message was successfully sent via Gmail`,
        'GmailProvider.send',
      );

      return true;
    } catch (error) {
      logger.error(
        `Error when sending notification via gmail: ${error}`,
        'GmailProvider.send',
      );
      return false;
    }
  }
}
