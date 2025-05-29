import { Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsDate, IsString } from 'class-validator';
export class CreateTestimonialDto {
  @IsNumber()
  testimonial_id: number;

  @IsNumber()
  user_id: number;

  @IsBoolean()
  status: boolean;

  @IsString()   
  testimonial: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;
}
