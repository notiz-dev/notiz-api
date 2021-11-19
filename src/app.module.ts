import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { SubscriptionModule } from './subscription/subscription.module';
import { GithubModule } from './github/github.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SubscriptionModule,
    GithubModule,
    AnalyticsModule,
  ],
  providers: [],
})
export class AppModule {}
