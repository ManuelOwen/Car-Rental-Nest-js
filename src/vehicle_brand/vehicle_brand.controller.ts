import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehicleBrandService } from './vehicle_brand.service';
import { CreateVehicleBrandDto } from './dto/create-vehicle_brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle_brand.dto';
// implement pipes
import { ParseIntPipe } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Controller('vehicle-brand')
export class VehicleBrandController {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
//  create a new vehicle brand
  @Post()
  create(@Body() createVehicleBrandDto: CreateVehicleBrandDto) {
    return this.vehicleBrandService.create(createVehicleBrandDto);
//   }
// geta vehicle brand bsearch
  }
  @Get()
  findAll(@Query('search')search?:string){
    return this.vehicleBrandService.findAll(search);
  }
// get a vehicle brand by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleBrandService.findOne(id);
  }
// update a vehicle brand by id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ whitelist: true, transform: true })) updateVehicleBrandDto: UpdateVehicleBrandDto) {
    return this.vehicleBrandService.update(id, updateVehicleBrandDto);
  }
// delete a vehicle brand by id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleBrandService.remove(id);
  }
}