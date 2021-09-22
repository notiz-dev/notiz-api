export enum Period {
  'day' = 'day',
  '7d' = '7d',
  '30d' = '30d',
  'month' = 'month',
  '6mo' = '6mo',
  '12mo' = '12mo',
}

export class AnalyticsPageRequest {
  results: PageRequest[];
}

export class PageRequest {
  page: string;
  visitors: number;
}
