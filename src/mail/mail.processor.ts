import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as dayjs from 'dayjs';

interface ConfirmSubscription {
  email: string;
  subscriptionId: string;
}

interface Newsletter {
  email: string;
  subscriptionId: string;
  subject: string;
  newsletterName: string;
}

interface Contact {
  email: string;
  name: string;
  message: string;
}

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);
  constructor(private readonly mailer: MailerService) {}

  @Process('confirm-subscription')
  async sendConfirmationMail(job: Job<ConfirmSubscription>) {
    const { email, subscriptionId } = job.data;
    this.logger.debug('sendConfirmationMail', job.data);
    await this.mailer.sendMail({
      to: email,
      subject: 'notiz.dev Newsletter: Please Confirm your Subscription',
      template: 'confirm-subscription',
      context: {
        email: email,
        uuid: subscriptionId,
      },
    });
  }

  @Process('newsletter')
  async sendNewsletter(job: Job<Newsletter>) {
    this.logger.debug('sendNewsletter', job.data);
    const { email, subject, newsletterName, subscriptionId } = job.data;
    await this.mailer.sendMail({
      to: email,
      subject: subject,
      // TODO subfolders are not supported with nest-mailer@1.6.0
      // template: `./newsletter/${newsletterName}.hbs`,
      template: `${newsletterName}`,
      context: {
        uuid: subscriptionId,
      },
    });
  }

  @Process('contact')
  async sendContactRequested(job: Job<Contact>) {
    const { email, name, message } = job.data;
    await this.mailer.sendMail({
      to: 'hi@notiz.dev',
      subject: 'Kontaktanfrage',
      template: 'contact',
      context: {
        email,
        name,
        message,
        date: dayjs().format('DD.MM.YYYY HH:mm'),
      },
    });
  }
}
