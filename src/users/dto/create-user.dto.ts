import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsInt,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsInt()
  user_id: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsNumber()
  phone_number: number;
  @IsBoolean()
  status: boolean;
  @IsString()
  profile_picture: string;
  @IsDate()
  @Type(() => Date)
  last_login: Date;
}
