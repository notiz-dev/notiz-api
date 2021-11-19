import { MailService } from '../mail/mail.service';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
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
}
