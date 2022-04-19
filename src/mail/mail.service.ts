import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  async subscriptionConfirmationMail(email: string, subscriptionId: string) {
    await this.mailQueue.add('confirm-subscription', {
      email: email,
      subscriptionId: subscriptionId,
    });
  }

  async sendNewsletterMail(
    email: string,
    subscriptionId: string,
    newsletterName: string,
    subject: string,
  ) {
    await this.mailQueue.add('newsletter', {
      email: email,
      subscriptionId: subscriptionId,
      newsletterName: newsletterName,
      subject: subject,
    });
  }

  async sendInternalContactRequested(
    email: string,
    name: string,
    message: string,
  ) {
    await this.mailQueue.add('contact', { email, name, message });
  }
}
