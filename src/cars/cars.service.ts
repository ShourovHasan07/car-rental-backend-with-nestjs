// src/cars/cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cars } from './car.model';
import { CreateCarDto } from './dto/cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Cars) private readonly carsModel: typeof Cars) {}

  // Create Car
  async createCar(data: CreateCarDto & { carImage?: string }) {
    if (data.carImage) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(data.carImage, {
        folder: 'cars',
      });
      data.carImage = result.secure_url;
    }

    // Type safe cast
    return this.carsModel.create<Cars>(data as any);
  }

  // Update Car
  async updateCar(id: number, data: UpdateCarDto & { carImage?: string }) {
    const car = await this.carsModel.findByPk(id);
    if (!car) throw new NotFoundException('Car not found');

    if (data.carImage) {
      const result = await cloudinary.uploader.upload(data.carImage, {
        folder: 'cars',
      });
      data.carImage = result.secure_url;
    }

    return car.update(data as any);
  }

  // Delete Car
  async deleteCar(id: number) {
    const car = await this.carsModel.findByPk(id);
    if (!car) throw new NotFoundException('Car not found');

    await car.destroy();
    return { message: 'Car deleted successfully' };
  }

  // Get All Cars
  async getAllCars() {
    return this.carsModel.findAll();
  }

  // Get Car by ID
  async getCarById(id: number) {
    const car = await this.carsModel.findByPk(id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }
}
