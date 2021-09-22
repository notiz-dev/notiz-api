import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, filter, map } from 'rxjs';
import { AnalyticsPageRequest, Period } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpService, private config: ConfigService) {}

  topPages(period: Period) {
    return this.http
      .get<AnalyticsPageRequest>(
        `https://analytics.notiz.dev/api/v1/stats/breakdown?site_id=notiz.dev&period=${period}&property=event:page`,
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
      );
  }
}
