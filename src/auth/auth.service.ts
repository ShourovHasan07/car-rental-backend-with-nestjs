

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Admin } from '../admin/admin.model';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  // ✅ Admin Login Service
  async adminLogin(email: string, password: string) {
    const admin = await this.adminModel.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password incorrect');
    }

    const token = this.jwtService.sign({
      id: admin.id,
      email: admin.email,
      role: 'ADMIN',
      type: 'ADMIN',
    });

    return {
      message: 'Admin login successful',
      token,
      admin,
    };
  }

  // ✅ Clerk User Login
 async clerkLogin(data: { clerkId: string; email: string; name: string }) {
  let user = await this.userModel.findOne({
    where: { clerkId: data.clerkId },
  });

  if (!user) {
    user = await this.userModel.create(
      {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
      } as any
    );
  }

  const token = this.jwtService.sign({
    id: user.id,
    email: user.email,
    role: 'USER',
    type: 'USER',
  });

  return {
    message: 'User login successful',
    token,
    user,
  };
}

}
