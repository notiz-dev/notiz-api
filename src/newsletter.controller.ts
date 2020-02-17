import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { Newsletter } from './newsletter';
import { SubscribeDto } from './subscribe.dto';

@Controller()
export class NewsletterController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('subscribe')
  async newsletter(): Promise<Newsletter[]> {
    return this.prisma.newsletter.findMany();
  }

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto): Promise<Newsletter> {
    let subscribption = await this.prisma.newsletter.findOne({
      where: { email },
    });

    if (subscribption) {
      subscribption = await this.prisma.newsletter.update({
        where: { email },
        data: { subscribed: true },
      });
    } else {
      subscribption = await this.prisma.newsletter.create({
        data: { email },
      });
    }

    return subscribption;
  }

  @Post('confirm')
  async confirm(@Body() { email }: SubscribeDto) {
    await this.prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() { email }: SubscribeDto) {
    // const subscribption = await this.prisma.newsletter.findOne({
    //   where: { email },
    // });

    // if (subscribption) {
    await this.prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });
    // } else {
    //   throw new NotFoundException();
    // }
  }
}
