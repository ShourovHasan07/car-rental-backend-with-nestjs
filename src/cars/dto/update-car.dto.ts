import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './cars.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
