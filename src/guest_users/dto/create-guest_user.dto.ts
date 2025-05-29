import { IsEmail, IsString, IsNumber } from 'class-validator';
export class CreateGuestUserDto {
  @IsNumber()
  guest_id: number;
  @IsEmail()
  email: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsNumber()
  phone_number: number;
}
