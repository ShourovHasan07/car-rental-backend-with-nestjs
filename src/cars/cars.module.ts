import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cars } from './car.model';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsAdminController } from './cars.admin.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cars])],
  providers: [CarsService],
  controllers: [CarsController, CarsAdminController],
})
export class CarsModule {}
