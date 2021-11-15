import { MailService } from './../mail/mail.service';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(private prisma: PrismaService, private mail: MailService) {}

  async subscribe(email: string) {
    let subscription = await this.prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscription) {
      subscription = await this.prisma.newsletter.create({
        data: { email },
      });
    }

    await this.mail.newsletterConfirmationMail(email, subscription.id);
  }

  async confirm(uuid: string) {
    try {
      await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { subscribed: true },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async unsubscribe(uuid: string) {
    try {
      await this.prisma.newsletter.delete({
        where: { id: uuid },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async sendNewsletter(newsletter: string, subject: string) {
    const subscribers = await this.prisma.newsletter.findMany({
      where: { subscribed: true },
    });

    let emailSend = 0;

    for await (const subscriber of subscribers) {
      try {
        await this.mail.sendNewsletterMail(
          subscriber.email,
          subscriber.id,
          newsletter,
          subject,
        );
        emailSend++;
        this.logger.debug('Sending newsletter');
      } catch (error) {
        this.logger.error('Sending newsletter failed', error);
      }
    }

    this.logger.debug(
      `Total subscriber count ${subscribers.length} and send mails ${emailSend}`,
    );
  }
}
