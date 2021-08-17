import { MailService } from './../mail/mail.service';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NewsletterService {
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
}
