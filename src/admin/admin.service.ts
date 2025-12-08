// src/modules/admin/admin.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
  ) {}

  async createAdmin(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    return this.adminModel.create({
      ...data,
      password: hashed,
    });
  }

  async getAllAdmins() {
    return this.adminModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }
}
