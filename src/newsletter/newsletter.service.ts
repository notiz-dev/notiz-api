import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}
}
