import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../admin/admin.guard';
import { CreateCarDto } from './dto/cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('admin/cars')
export class CarsAdminController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('create')
  create(@Body() body: CreateCarDto & { carImage?: string }) {
    return this.carsService.createCar(body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateCarDto & { carImage?: string },
  ) {
    return this.carsService.updateCar(+id, body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.carsService.deleteCar(+id);
  }
}
