import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [NewsletterController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
