// src/modules/auth/dto/clerk-login.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ClerkLoginDto {
  @IsNotEmpty()
  clerkId: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
