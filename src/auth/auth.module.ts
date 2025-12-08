// src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';

import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/admin.model';
import { User } from '../users/user.model';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwtSecretKey123',
      signOptions: { expiresIn: '7d' },
    }),
    SequelizeModule.forFeature([Admin, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
