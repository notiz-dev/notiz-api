import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(private prisma: PrismaService, private mail: MailService) {}

  async sendNewsletter(newsletter: string, subject: string) {
    const subscribers = await this.prisma.subscription.findMany({
      where: { subscribed: true },
    });

    const sentNewsletter = await this.prisma.newsletter.create({
      data: {
        newsletter,
        subject,
        subscribed: subscribers.length,
      },
    });

    let emailSent = 0;

    for await (const subscriber of subscribers) {
      try {
        await this.mail.sendNewsletterMail(
          subscriber.email,
          subscriber.id,
          newsletter,
          subject,
        );
        emailSent++;
        this.logger.debug('Sending newsletter');
      } catch (error) {
        this.logger.error('Sending newsletter failed', error);
      }
    }

    await this.prisma.newsletter.update({
      where: { id: sentNewsletter.id },
      data: {
        sent: emailSent,
      },
    });

    this.logger.debug(
      `Total subscriber count ${subscribers.length} and send mails ${emailSent}`,
    );
  }
}
