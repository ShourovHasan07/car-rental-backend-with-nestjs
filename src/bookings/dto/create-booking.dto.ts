
import { IsInt, IsNotEmpty, IsString, IsDateString, IsPositive, Length } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  carId: number;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  pickupLocation: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  returnLocation: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
