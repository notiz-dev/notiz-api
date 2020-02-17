import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { PrismaService } from './services/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [NewsletterController],
  providers: [PrismaService, MailService],
})
export class AppModule {}
