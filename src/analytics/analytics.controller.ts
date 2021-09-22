import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PageRequest, Period } from './entities/analytics.entity';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@ApiTags('Analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('')
  @ApiQuery({ name: 'period', required: false, enum: Period })
  topPages(
    @Query('period') period: Period = Period['30d'],
  ): Observable<PageRequest[]> {
    return this.analyticsService.topPages(period);
  }
}
