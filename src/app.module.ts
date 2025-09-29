import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationProvidersModule } from './notifications/notification.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.validation';
import { TestNotificationsModule } from './test-notifications/test-notifications.module';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';

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
    NotificationProvidersModule,
    TestNotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
