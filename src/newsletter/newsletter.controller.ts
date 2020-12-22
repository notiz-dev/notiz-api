import { confirmedSubscriptionTemplate } from './../mails/confirmed-subscription.template';
import { subscriptionTemplate } from './../mails/subscription.template';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { ConfirmDto } from './dto/confirm.dto';
import { PrismaService } from 'nestjs-prisma';
import { SubscribeDto } from './dto/subscribe.dto';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Newsletter')
@Controller()
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    await this.newsletterService.subscribe(email);
  }

  // TODO change to put
  @Post('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    await this.newsletterService.confirm(uuid);
  }

  // TODO change to put
  @Post('unsubscribe')
  async unsubscribe(@Body() { uuid }: ConfirmDto) {
    await this.newsletterService.unsubscribe(uuid);
  }
}
