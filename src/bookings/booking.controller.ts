// src/modules/bookings/booking.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Create a new booking
  @Post()
  async createBooking(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  // Get bookings for a specific user
  @Get('user/:userId')
  async getUserBookings(@Param('userId') userId: number) {
    return this.bookingService.getUserBookings(userId);
  }

  // Get all bookings (Admin)
  @Get('all')
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Patch(':id/confirm')
confirm(@Param('id') id: number) {
  return this.bookingService.updateStatus(id, 'confirmed');
}

@Patch(':id/cancel')
cancel(@Param('id') id: number) {
  return this.bookingService.updateStatus(id, 'cancelled');
}

}
