import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { NewsletterModule } from './newsletter/newsletter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './mailer-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
    PrismaModule,
    NewsletterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
