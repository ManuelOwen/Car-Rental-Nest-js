
import {IsEmail,IsString,IsDate, IsNumber} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateVehicleBrandDto {
    @IsNumber()
    brand_id: number;

    @IsString()
    brand_name: string;
    @Type(() => Date)
    @IsDate()
    created_at: Date;
}
