import { IsEnum, IsString } from 'class-validator';
import { NotificationsProviderEnum } from 'src/notifications/enums/notification-providers.enum';

export class SendNotificationDTO {
  @IsEnum(NotificationsProviderEnum)
  type: NotificationsProviderEnum;

  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
