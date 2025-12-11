// src/modules/bookings/booking.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { User } from '../users/user.model';
import { Cars } from '../cars/car.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, User, Cars])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
