import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsConsumerController } from './notifications-consumer.controller';
import { NotificationsConsumerService } from './notifications-consumer.service';

describe('NotificationsConsumerController', () => {
  let controller: NotificationsConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsConsumerController],
      providers: [NotificationsConsumerService],
    }).compile();

    controller = module.get<NotificationsConsumerController>(
      NotificationsConsumerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
