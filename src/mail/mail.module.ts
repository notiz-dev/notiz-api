import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerConfigService } from './mailer-config.service';
import { MailProcessor } from './mail.processor';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
    BullModule.registerQueue({ name: 'mail' }),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
