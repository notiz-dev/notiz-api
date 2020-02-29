import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { SubscribeDto } from './subscribe.dto';
import { ConfirmDto } from './confirm.dto';
import { MailService } from './services/mail.service';
import { subscriptionTemplate } from './mails/subscription.template';
import { confirmedSubscriptionTemplate } from './mails/confirmed-subscription.template';

@Controller()
export class NewsletterController {
  constructor(private prisma: PrismaService, private mail: MailService) {}

  @Get()
  getHello(): string {
    return 'notiz.dev';
  }

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    let subscription = await this.prisma.newsletter.findOne({
      where: { email },
    });

    if (subscription) {
      await this.prisma.newsletter.update({
        where: { email },
        data: { subscribed: true },
      });
    } else {
      subscription = await this.prisma.newsletter.create({
        data: { email },
      });

      await this.mail.sendHTMLMail(
        email,
        'Confirm your subscription',
        subscriptionTemplate(subscription.id),
      );
    }
  }

  @Post('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    try {
      const newsletter = await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { confirmed: true },
      });

      await this.mail.sendHTMLMail(
        newsletter.email,
        'Subscription confirmed',
        confirmedSubscriptionTemplate(newsletter.id),
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() { uuid }: ConfirmDto) {
    try {
      await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { subscribed: false },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
