import { MailService } from './../mail/mail.service';
import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService, private mail: MailService) {}

  async create({ email, name, message }: CreateContactDto) {
    await this.prisma.contact.create({
      data: {
        email,
        name,
        message,
      },
    });

    await this.mail.sendInternalContactRequested(email, name, message);
  }
}
