import { HttpService } from '@nestjs/axios';
import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { map, Observable, tap, filter } from 'rxjs';
import { PageRequest, Period } from './entities/analytics.entity';
import { AnalyticsService } from './analytics.service';
import { Post } from './entities/post.entity';

@Controller('analytics')
@ApiTags('Analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private httpService: HttpService,
  ) {}

  @Get('')
  @ApiQuery({ name: 'period', required: false, enum: Period })
  topPages(
    @Query('period', new DefaultValuePipe(Period['30d'])) period: Period,
  ): Observable<PageRequest[]> {
    return this.analyticsService.topPages(period);
  }

  @Get('latest')
  latestPosts() {
    return this.httpService
      .get('https://notiz.dev/assets/scully-routes.json')
      .pipe(
        map((response) => response.data as Post[]),
        map((pages) => pages.filter((p) => p.route.startsWith('/blog/'))),
        map((pages) =>
          pages.sort((p1, p2) =>
            new Date(p1.publishedAt) > new Date(p2.publishedAt) ? -1 : 1,
          ),
        ),
      );
  }
}
