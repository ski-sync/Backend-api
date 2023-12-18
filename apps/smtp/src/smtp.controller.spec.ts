import { Test, TestingModule } from '@nestjs/testing';
import { SmtpController } from './smtp.controller';
import { SmtpService } from './smtp.service';

describe('SmtpController', () => {
  let smtpController: SmtpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SmtpController],
      providers: [SmtpService],
    }).compile();

    smtpController = app.get<SmtpController>(SmtpController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(smtpController.getHello()).toBe('Hello World!');
    });
  });
});
