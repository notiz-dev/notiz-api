import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: this.configService.get('MAIL_HOST'),
        port: 465,
        secure: true,
        auth: {
          user: this.configService.get('MAIL_USER'),
          pass: this.configService.get('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: `"notiz.dev" <${this.configService.get('MAIL_USER')}>`,
      },
      template: {
        dir: `${process.cwd()}/templates/`,
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    };
  }
}
