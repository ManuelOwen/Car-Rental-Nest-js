import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCacheMeDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsInt()
  ttl: number;
}
