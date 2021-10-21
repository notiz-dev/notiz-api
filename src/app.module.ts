import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { NewsletterModule } from './newsletter/newsletter.module';
import { GithubModule } from './github/github.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    NewsletterModule,
    GithubModule,
    AnalyticsModule,
  ],
  providers: [],
})
export class AppModule {}
