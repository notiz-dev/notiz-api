import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { NewsletterController } from './newsletter.controller';

describe('NewsletterController', () => {
  let controller: NewsletterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterController],
      providers: [PrismaService],
    }).compile();

    controller = module.get<NewsletterController>(NewsletterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
