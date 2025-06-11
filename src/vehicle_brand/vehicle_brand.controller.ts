import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { VehicleBrandService } from './vehicle_brand.service';
import { CreateVehicleBrandDto } from './dto/create-vehicle_brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle_brand.dto';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AtGuard } from 'src/auth/token/token.guard';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('vehicle-brand')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
export class VehicleBrandController {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}

  // Only admin can create a vehicle brand
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  create(@Body() createVehicleBrandDto: CreateVehicleBrandDto) {
    return this.vehicleBrandService.create(createVehicleBrandDto);
  }

  // Admin and user can get all brands
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.vehicleBrandService.findAll(search);
  }

  // Admin and user can get a brand by id
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleBrandService.findOne(id);
  }

  // Only admin can update a brand
  @Roles(Role.ADMIN)
  @Put(':id')
  async UpdateVehicleBrandDto(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    updateVehicleBrandDto: UpdateVehicleBrandDto,
  ) {
    return this.vehicleBrandService.update(id, updateVehicleBrandDto);
  }

  // Only admin can delete a brand
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleBrandService.remove(id);
  }
}
