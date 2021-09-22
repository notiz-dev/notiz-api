export enum Period {
  'day',
  '7d',
  '30d',
  'month',
  '6mo',
  '12mo'
}

export class AnalyticsPageRequest {
  results: PageRequest[];
}

export class PageRequest {
  page: string;
  visitors: number;
}
