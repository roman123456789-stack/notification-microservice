import { Module } from '@nestjs/common';
import { NotificationProvidersService } from './notifications.service';
import { NotificationsStrategy } from './notifications-strategy';
import { GmailProvider } from './providers/gmail.provider';
import { MailProvider } from './providers/mail.provider';

@Module({
  controllers: [],
  providers: [
    NotificationProvidersService,
    NotificationsStrategy,
    GmailProvider,
    MailProvider,
  ],
  exports: [NotificationProvidersService],
})
export class NotificationProvidersModule {}
