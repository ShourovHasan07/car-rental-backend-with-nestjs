import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';

import { User } from './users/user.model';
import { Admin } from './admin/admin.model';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CarsModule } from './cars/cars.module';
import { BookingModule } from './bookings/booking.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),

    //  Global Model Register
    SequelizeModule.forFeature([User, Admin]),

    UsersModule,
    AuthModule,
    AdminModule,
    CarsModule,

    BookingModule,
    PaymentsModule,

    
  ],
})
export class AppModule {}
