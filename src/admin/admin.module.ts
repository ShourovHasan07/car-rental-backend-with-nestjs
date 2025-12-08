import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
})
export class AdminModule {}
