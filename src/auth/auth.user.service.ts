import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { ClerkLoginDto } from './dto/clerk-login.dto';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async clerkLogin(data: ClerkLoginDto) {
    const { clerkId, email, name } = data;

    // 1. Check user exists
    let user = await this.userModel.findOne({ where: { email } });

    // 2. If not exists → Create
    if (!user) {
      user = await this.userModel.create({
        clerkId,
        email,
        name,
        password: '', // clerk users don't need password
        status: true,
      });
    }

    // 3. Create JWT
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      type: 'USER',
    });

    return {
      message: 'Login successful',
      token,
      user,
    };
  }
}
