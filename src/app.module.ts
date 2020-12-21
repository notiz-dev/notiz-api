import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [NewsletterController],
  providers: [ MailService],
})
export class AppModule {}
