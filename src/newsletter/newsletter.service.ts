import { confirmedSubscriptionTemplate } from './../mails/confirmed-subscription.template';
import { subscriptionTemplate } from './../mails/subscription.template';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async subscribe(email: string) {
    let subscription = await this.prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscription) {
      subscription = await this.prisma.newsletter.create({
        data: { email },
      });
    }

    await this.mailer.sendMail({
      to: email,
      subject: 'Confirm your subscription',
      template: 'confirm-subscription',
      context: {
        email: email,
        uuid: subscription.id
      },
    });
  }

  async confirm(uuid: string) {
    try {
      const newsletter = await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { subscribed: true, confirmed: true },
      });

      await this.mailer.sendMail({
        to: newsletter.email,
        subject: 'Subscription confirmed',
        html: confirmedSubscriptionTemplate(newsletter.id),
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async unsubscribe(uuid: string) {
    try {
      // TODO delete user
      await this.prisma.newsletter.update({
        where: { id: uuid },
        data: { subscribed: false },
      });

      // TODO send mail that the user is unsubscribed succesful
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
