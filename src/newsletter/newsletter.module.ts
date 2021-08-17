import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { PrismaModule } from 'nestjs-prisma';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports: [PrismaModule, MailModule],
})
export class NewsletterModule {}
