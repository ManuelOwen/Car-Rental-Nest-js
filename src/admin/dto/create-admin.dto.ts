import { IsEmail, IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDto {
  @IsNumber()
  admin_id: number;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @Type(() => Date)
  @IsDate()
  last_login: Date;
}
