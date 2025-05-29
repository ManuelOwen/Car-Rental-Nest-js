import { Type } from 'class-transformer';
import { IsInt, IsDate, IsBoolean } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  user_id: number;

  @IsInt()
  vehicle_id: number;

  @IsDate()
  @Type(() => Date)
  booking_date: Date;

  @IsBoolean()
  status: boolean;
  @IsInt()
  booking_id: number;
  @IsDate()
  @Type(() => Date)
  return_date: Date;
}
