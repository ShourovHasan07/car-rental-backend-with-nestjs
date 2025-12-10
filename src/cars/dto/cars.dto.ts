import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  brand: string;

  @IsNotEmpty({ message: 'Model is required' })
  @IsString({ message: 'Model must be a string' })
  model: string;

  @IsNotEmpty({ message: 'Year is required' })
  @IsString({ message: 'Year must be a string' })
  year: string;

  @IsNotEmpty({ message: 'Daily price is required' })
  @IsString({ message: 'Daily price must be a string' })
  dailyPrice: string;

  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  category: string;

  @IsNotEmpty({ message: 'Transmission is required' })
  @IsString({ message: 'Transmission must be a string' })
  transmission: string;

  @IsNotEmpty({ message: 'Fuel type is required' })
  @IsString({ message: 'Fuel type must be a string' })
  fuelType: string;

  @IsNotEmpty({ message: 'Seating capacity is required' })
  @IsString({ message: 'Seating capacity must be a string' })
  seatingCapacity: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  location: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isAvailable must be a boolean' })
  isAvailable?: boolean;
}
