import { Test, TestingModule } from '@nestjs/testing';
import { TestNotificationsService } from './test-notifications.service';

describe('TestNotificationsService', () => {
  let service: TestNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestNotificationsService],
    }).compile();

    service = module.get<TestNotificationsService>(TestNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
