import { Controller, Post, Body, Put } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { ConfirmDto } from './dto/confirm.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Newsletter')
@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    await this.newsletterService.subscribe(email);
  }

  @Put('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    await this.newsletterService.confirm(uuid);
  }

  @Put('unsubscribe')
  async unsubscribe(@Body() { uuid }: ConfirmDto) {
    await this.newsletterService.unsubscribe(uuid);
  }
}
