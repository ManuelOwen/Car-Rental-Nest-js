import { Type } from 'class-transformer';
import { IsInt, IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  user_id: number;

  @IsInt()
  vehicle_id: number;

  @IsDate()
  @Type(() => Date)
  booking_date: Date;

  @IsInt()
  booking_id: number;
  @IsDate()
  @Type(() => Date)
  return_date: Date;
}
