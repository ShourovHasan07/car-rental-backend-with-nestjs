import { IsEmail, IsString } from 'class-validator';

export class ClerkLoginDto {
  @IsString()
  clerkId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
