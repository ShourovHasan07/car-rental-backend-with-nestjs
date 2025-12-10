import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,Param ,Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../admin/admin.guard';
import { CreateCarDto } from './dto/cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';





@Controller('admin/cars')
export class CarsAdminController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('carImage'))

  // create cares 
  async create(
    @Body() body: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Car image is required');
    }

    // buffer assign 
    body['carImage'] = file.buffer;

    return this.carsService.createCar(body);
  }


  // update  cares




@UseGuards(JwtAuthGuard, AdminGuard)
@Post('update/:id')  
@UseInterceptors(FileInterceptor('carImage'))
async update(
  @Param('id') id: number,
  @Body() body: UpdateCarDto,
  @UploadedFile() file?: Express.Multer.File, // if file not come here 
) {
  //   if uplode ,buffer assign 
  if (file) {
    body['carImage'] = file.buffer;
  }

  return this.carsService.updateCar(id, body);




}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         


 
 
// DELETE cars 
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteCar(id);
  }






}


