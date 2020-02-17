import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { SubscribeDto } from './subscribe.dto';

@Controller()
export class NewsletterController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return 'notiz.dev';
  }

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    const subscription = await this.prisma.newsletter.findOne({
      where: { email },
    });

    if (subscription) {
      await this.prisma.newsletter.update({
        where: { email },
        data: { subscribed: true },
      });
    } else {
      await this.prisma.newsletter.create({
        data: { email },
      });
    }
  }

  @Post('confirm')
  async confirm(@Body() { email }: SubscribeDto) {
    try {
      await this.prisma.newsletter.update({
        where: { email },
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
