import { Test, TestingModule } from '@nestjs/testing';
import { TestNotificationsController } from './test-notifications.controller';

describe('TestNotificationsController', () => {
  let controller: TestNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestNotificationsController],
    }).compile();

    controller = module.get<TestNotificationsController>(
      TestNotificationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
