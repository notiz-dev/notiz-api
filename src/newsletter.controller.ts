import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { Newsletter } from './newsletter';
import { NewsletterSignupDto } from './newsletter.dto';

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

  @Get('newsletter')
  async newsletter(): Promise<Newsletter[]> {
    return this.prisma.newsletter.findMany();
  }

  @Post('newsletter')
  async newsletterSignup(
    @Body() { email }: NewsletterSignupDto,
  ): Promise<Newsletter> {
    let signup = await this.prisma.newsletter.findOne({ where: { email } });

    if (signup) {
      signup = await this.prisma.newsletter.update({
        where: { email },
        data: { enabled: true },
      });
    } else {
      signup = await this.prisma.newsletter.create({
        data: { email },
      });
    }

    return signup;
  }
}
