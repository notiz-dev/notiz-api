import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription';
import { SubscriptionController } from './subscription.controller';
import { PrismaModule } from 'nestjs-prisma';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [PrismaModule, MailModule],
})
export class SubscriptionModule {}
