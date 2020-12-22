import { confirmedSubscriptionTemplate } from './../mails/confirmed-subscription.template';
import { subscriptionTemplate } from './../mails/subscription.template';
import { MailService } from './../services/mail.service';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { ConfirmDto } from './dto/confirm.dto';
import { PrismaService } from 'nestjs-prisma';
import { SubscribeDto } from './dto/subscribe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Newsletter')
@Controller()
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
    private prisma: PrismaService,
    private mail: MailService,
  ) {}

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    let subscription = await this.prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscription) {
      subscription = await this.prisma.newsletter.create({
        data: { email },
      });
    }

    await this.mail.sendHTMLMail(
      email,
      'Confirm your subscription',
      subscriptionTemplate(subscription.id),
    );
  }

  @Post('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    try {
      const newsletter = await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { subscribed: true, confirmed: true },
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
