// src/modules/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  adminLogin(@Body() body: { email: string; password: string }) {
    return this.authService.adminLogin(body.email, body.password);
  }

  @Post('user/clerk-login')
  clerkLogin(@Body() body: { clerkId: string; email: string; name: string }) {
    return this.authService.clerkLogin(body);
  }
}
