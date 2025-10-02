import {
  IsString,
  IsUUID,
  IsEmail,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string | null;

  @IsOptional()
  @IsString()
  lastName: string | null;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}

export class CreateNotificationsConsumerDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
