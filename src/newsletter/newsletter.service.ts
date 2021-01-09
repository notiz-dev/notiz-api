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
      subject: 'notiz.dev Newsletter: Please Confirm your Subscription',
      template: 'confirm-subscription',
      context: {
        email: email,
        uuid: subscription.id,
      },
    });
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
}
