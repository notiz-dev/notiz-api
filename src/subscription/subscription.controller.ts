import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription';
import { ConfirmDto } from './dto/confirm.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { ApiTags } from '@nestjs/swagger';
import { NewsletterDto } from './dto/newsletter.dto';

@ApiTags('Subscription')
@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(@Body() { email }: SubscribeDto) {
    await this.subscriptionService.subscribe(email);
  }

  @Put('confirm')
  async confirm(@Body() { uuid }: ConfirmDto) {
    await this.subscriptionService.confirm(uuid);
  }

  @Put('unsubscribe')
  async unsubscribe(@Body() { uuid }: ConfirmDto) {
    await this.subscriptionService.unsubscribe(uuid);
  }

  // @Post('send')
  // TODO secure endpoint
  // async sendNewsletter(@Body() { newsletter, subject }: NewsletterDto) {
  //   await this.subscriptionService.sendNewsletter(newsletter, subject);
  // }
}
