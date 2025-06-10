import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { GuestUsersService } from './guest_users.service';
import { CreateGuestUserDto, UpdateGuestUserDto } from './dto';

@Controller('guest-users')
export class GuestUsersController {
  constructor(private readonly guestUsersService: GuestUsersService) {}
  // create a neaw guest
  @Post()
  create(@Body() createGuestUserDto: CreateGuestUserDto) {
    return this.guestUsersService.create(createGuestUserDto);
  }

  @Put(':id')
  updateGuest(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGuestUserDto: UpdateGuestUserDto,
  ) {
    return this.guestUsersService.updateGuest(id, updateGuestUserDto);
  }

  @Delete(':id')
  deleteGuest(@Param('id', ParseIntPipe) id: number) {
    return this.guestUsersService.deleteGuest(id);
  }
  // // get all guest users
  @Get()
  findAll() {
    return this.guestUsersService.findAll();
  }
  // // get guest user by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.guestUsersService.findOne(id, new ParseIntPipe());
  }
}
