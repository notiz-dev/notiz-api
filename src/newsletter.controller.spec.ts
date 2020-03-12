import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { PrismaService } from './services/prisma.service';
import { MailService } from './services/mail.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let newsletterController: NewsletterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterController],
      providers: [PrismaService, MailService, ConfigService],
    }).compile();

    newsletterController = app.get<NewsletterController>(NewsletterController);
  });

  it('should be defined', () => {
    expect(newsletterController).toBeDefined();
  });
});
