import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/entities/user.entity';
import { AtGuard } from 'src/auth/token/token.guard';
import { RolesGuard } from 'src/auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('vehicle')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Roles(Role.ADMIN, Role.GUEST, Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.remove(id);
  }
}
