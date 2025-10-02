import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationProvidersModule } from './notifications/notification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.validation';
import { TestNotificationsModule } from './test-notifications/test-notifications.module';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { NotificationsConsumerModule } from './notifications-consumer/notifications-consumer.module';
import { BullModule } from '@nestjs/bullmq';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.getOrThrow<string>('REDIS_HOST'),
          port: config.getOrThrow<number>('REDIS_PORT'),
          password: config.getOrThrow<string>('REDIS_PASSWORD'),
          maxRetriesPerRequest: null,
        },
      }),
    }),
    TerminusModule,
    HttpModule,
    NotificationProvidersModule,
    TestNotificationsModule,
    NotificationsConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
