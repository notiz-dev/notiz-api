import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  message: string;
}
