import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cars } from './car.model';
import { CreateCarDto } from './dto/cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Cars) private readonly carsModel: typeof Cars) {}

 async createCar(data: CreateCarDto & { carImage?: any }) {
    if (!data.carImage) {
      throw new BadRequestException('Car image is required');
    }

    // Cloudinary buffer upload
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'cars' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(data.carImage); // buffer send
    });

    data.carImage = uploadResult.secure_url;

    return this.carsModel.create<Cars>(data as any);
  }


  // update car 


   async updateCar(id: number, data: UpdateCarDto & { carImage?: any }) {
  //  car existence 
  const car = await this.carsModel.findByPk(id);
  if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

  //  image , Cloudinary upload
  if (data.carImage) {
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'cars' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(data.carImage); // buffer send
    });

    data.carImage = uploadResult.secure_url;
  }

  // update car
  await car.update(data); // only frontend sent field
  return{   message: 'Car updated successfully', car } ; // updated car return
}






  async deleteCar(id: number) {
    const car = await this.carsModel.findByPk(id);
    if (!car) throw new NotFoundException('Car not found');
    await car.destroy();
    return { message: 'Car deleted successfully' };
  }

  async getAllCars() {
    return this.carsModel.findAll();
  }

  async getCarById(id: number) {
    const car = await this.carsModel.findByPk(id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }
}
