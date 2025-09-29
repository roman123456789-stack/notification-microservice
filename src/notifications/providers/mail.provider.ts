import { ConfigService } from '@nestjs/config';
import { NotificationsProvider } from '../interfaces/notification-provider.interface';
import { createTransporter } from '../configs/mail.config';
import { Injectable } from '@nestjs/common';
import { ProviderSendNotificationParameters } from '../interfaces/provider-send-notification.interface';

@Injectable()
export class MailProvider implements NotificationsProvider {
  private transporter;

  constructor(private readonly config: ConfigService) {
    const emailUsername = this.config.getOrThrow<string>('MAIL_EMAIL_ADDRESS');
    const emailPassword = this.config.getOrThrow<string>('MAIL_EMAIL_PASSWORD');

    this.transporter = createTransporter(emailUsername, emailPassword);
  }
  async send(options: ProviderSendNotificationParameters): Promise<boolean> {
    try {
      logger.debug(
        `The beginning of sending notification via mail`,
        'MailProvider.send',
      );

      await this.transporter.sendMail({
        from: this.config.getOrThrow<string>('MAIL_EMAIL_ADDRESS'),
        to: options.to,
        subject: options?.subject || 'Новое уведомление',
        html: options.message,
      });

      logger.debug(
        `The message was successfully sent via Mail`,
        'MailProvider.send',
      );

      return true;
    } catch (error) {
      logger.error(
        `Error when sending notification via mail: ${error}`,
        'MailProvider.send',
      );
      return false;
    }
  }
}
