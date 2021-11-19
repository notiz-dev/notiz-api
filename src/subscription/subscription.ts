import { MailService } from '../mail/mail.service';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(private prisma: PrismaService, private mail: MailService) {}

  async subscribe(email: string) {
    let subscription = await this.prisma.subscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      subscription = await this.prisma.subscription.create({
        data: { email },
      });
    }

    await this.mail.subscriptionConfirmationMail(email, subscription.id);
  }

  async confirm(uuid: string) {
    try {
      await this.prisma.subscription.update({
        where: { id: uuid },
        data: { subscribed: true },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async unsubscribe(uuid: string) {
    try {
      await this.prisma.subscription.delete({
        where: { id: uuid },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async sendNewsletter(newsletter: string, subject: string) {
    const subscribers = await this.prisma.subscription.findMany({
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
