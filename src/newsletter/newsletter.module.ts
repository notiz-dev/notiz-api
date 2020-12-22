import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports: [PrismaModule],
})
export class NewsletterModule {}
