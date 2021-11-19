import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, filter, map, of } from 'rxjs';
import { AnalyticsPageRequest, Period } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private http: HttpService, private config: ConfigService) {}

  topPages(period: Period) {
    return this.http
      .get<AnalyticsPageRequest>(
        `${this.config.get(
          'PLAUSIBLE_HOST',
        )}/api/v1/stats/breakdown?site_id=${this.config.get(
          'PLAUSIBLE_SITE_ID',
        )}&period=${period}&property=event:page`,
        {
          headers: {
            Authorization: `Bearer ${this.config.get('PLAUSIBLE_TOKEN')}`,
          },
        },
      )
      .pipe(
        map((res) => res.data.results),
        map((pages) =>
          pages.filter(
            (p) =>
              p.page.startsWith('/blog') &&
              p.page.endsWith('/') &&
              p.page !== '/blog/',
          ),
        ),
        catchError((error) => {
          this.logger.error('Fetching top pages', error);
          return of([]);
        }),
      );
  }
}
