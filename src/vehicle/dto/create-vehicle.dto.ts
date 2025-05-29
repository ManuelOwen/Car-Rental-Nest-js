import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
// import { Vehicle } from '../entities/vehicle.entity';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  model: string;
  @IsNumber()
  @IsNotEmpty()
  price_per_day: number;
  @IsOptional()
  availability?: boolean = true;
  @IsNumber()
  @IsNotEmpty()
  vehicle_id: number;
  @IsNumber()
  @IsNotEmpty()
  brand_id: number;
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsDate()
  @Type(() => Date)
  created_at: Date;
  // This is the ID of the brand, not the vehicle
  // TThis is the ID of the vehicle, not the brand
  // Default value is true
}
