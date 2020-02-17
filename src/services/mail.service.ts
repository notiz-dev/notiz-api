import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService implements OnModuleInit, OnModuleDestroy {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.transporter = await createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  onModuleDestroy() {
    this.transporter.close();
  }

  async sendMail(to: string, subject: string, text: string) {
    return await this.transporter.sendMail({
      from: `"Notiz" <${this.configService.get('MAIL_USER')}>`,
      to: to,
      subject: subject,
      text: text,
    });
  }
}
