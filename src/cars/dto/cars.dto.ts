import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty() @IsString() brand: string;
  @IsNotEmpty() @IsString() model: string;
  @IsNotEmpty() @IsString() year: string;
  @IsNotEmpty() @IsString() dailyPrice: string;
  @IsNotEmpty() @IsString() category: string;
  @IsNotEmpty() @IsString() transmission: string;
  @IsNotEmpty() @IsString() fuelType: string;
  @IsNotEmpty() @IsString() seatingCapacity: string;
  @IsNotEmpty() @IsString() location: string;
  @IsOptional() @IsString() description?: string;
}
