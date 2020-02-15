import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let newsletterController: NewsletterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterController],
      providers: [AppService],
    }).compile();

    newsletterController = app.get<NewsletterController>(NewsletterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(newsletterController.getHello()).toBe('Hello World!');
    });
  });
});
