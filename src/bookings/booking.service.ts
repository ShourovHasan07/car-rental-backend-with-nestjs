// src/modules/bookings/booking.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Op } from 'sequelize';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private readonly bookingModel: typeof Booking,
  ) {}

  async createBooking(dto: CreateBookingDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (end <= start) {
      throw new BadRequestException('End date must be after start date');
    }

    // Overlapping check
    const existing = await this.bookingModel.findOne({
      where: {
        carId: dto.carId,
        status: 'pending', // or 'confirmed'
        startDate: { [Op.lt]: end },
        endDate: { [Op.gt]: start },
      },
    });

    if (existing) {
      throw new BadRequestException('Car is already booked for selected dates');
    }

    // Create booking (Default status = pending)
    const booking = await this.bookingModel.create({
      userId: dto.userId,
      carId: dto.carId,
      pickupLocation: dto.pickupLocation,
      returnLocation: dto.returnLocation,
      phone: dto.phone,
      price: dto.price,
      startDate: start,
      endDate: end,
      status: 'pending', // default status
    });

    return booking;
  }

  async getUserBookings(userId: number) {
    return this.bookingModel.findAll({ where: { userId } });
  }

  async getAllBookings() {
    return this.bookingModel.findAll();
  }

  async cancelBooking(id: number) {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    booking.status = 'cancelled';
    await booking.save();
    return booking;
  }

  // Admin confirm
  async confirmBooking(id: number) {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) throw new BadRequestException('Booking not found');

    booking.status = 'confirmed';
    await booking.save();
    return booking;
  }


  // update statuse 

  async updateStatus(id: number, status: 'pending' | 'confirmed' | 'cancelled') {
  const booking = await this.bookingModel.findByPk(id);
  if (!booking) {
    throw new BadRequestException('Booking not found');
  }

  booking.status = status;
  await booking.save();
  return booking;
}




}
