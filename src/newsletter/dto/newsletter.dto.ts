import { IsNotEmpty } from 'class-validator';

export class NewsletterDto {
  @IsNotEmpty()
  newsletter: string;
  @IsNotEmpty()
  subject: string;
}
