import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async newsletterConfirmationMail(email: string, subscriptionId: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'notiz.dev Newsletter: Please Confirm your Subscription',
      template: './confirm-subscription',
      context: {
        email: email,
        uuid: subscriptionId,
      },
    });
  }

  async sendNewsletterMail(
    email: string,
    subscriptionId: string,
    newsletterName: string,
    subject: string,
  ) {
    await this.mailer.sendMail({
      to: email,
      subject: subject,
      template: `./${newsletterName}`,
      context: {
        uuid: subscriptionId,
      },
    });
  }
}
