// src/modules/admin/admin.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  create(@Body() body) {
    return this.adminService.createAdmin(body);
  }

  @Get()
  findAll() {
    return this.adminService.getAllAdmins();
  }
}
