import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { NewsletterDto } from './dto/newsletter.dto';
import { NewsletterService } from './newsletter.service';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  // TODO secure endpoint
  // @Post('send')
  // async sendNewsletter(@Body() { newsletter, subject }: NewsletterDto) {
  //   await this.newsletterService.sendNewsletter(newsletter, subject);
  // }
}
