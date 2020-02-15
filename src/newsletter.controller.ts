import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { Newsletter } from '@prisma/client';

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
  newsletter(): Promise<Newsletter[]> {
    return this.prisma.newsletter.findMany();
  }
}
