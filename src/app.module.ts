import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { SubscriptionModule } from './subscription/subscription.module';
import { GithubModule } from './github/github.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          redis: {
            host: config.get('REDIS_HOST'),
            port: 6379,
          },
        };
      },
      inject: [ConfigService],
    }),
    MailModule,
    SubscriptionModule,
    NewsletterModule,
    GithubModule,
    AnalyticsModule,
  ],
  providers: [],
})
export class AppModule {}
