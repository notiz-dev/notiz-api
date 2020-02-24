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

      await this.mail.sendMail(
        email,
        'Confirm your subscription',
        `Hey thanks for taking an interest in notiz.dev. Please confirm your email for us. https://notiz.dev/confirm-subscription?uuid=${subscription.id}`,
      );
    }
  }

  @Post('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    try {
      await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { confirmed: true },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() { email }: SubscribeDto) {
    try {
      await this.prisma.newsletter.update({
        where: { email },
        data: { subscribed: false },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
