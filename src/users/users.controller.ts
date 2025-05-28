import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { IUser } from './entities/user.entity';

// implement pipes
import { ParseIntPipe } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // get all users
  @Get()
  findAllUsers(): IUser[] {
    return this.usersService.findAll();
  }
  // get user by searching
  @Get('search')
  searchUsers(@Query('q') q: string): IUser[] {
    return this.usersService.searchUsers(q);
  }
  // get user by id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): IUser | undefined {
    // const parsedId = parseInt(id, 10);
    return this.usersService.getUserById(id);
  }
  // create a new user
  @Post()
  createUser(@Body() user: CreateUserDto): IUser {
    return this.usersService.createUser(user);
  }
  // update a user
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<IUser>,
  ): IUser | undefined {
    // const parsedId = parseInt(id, 10);
    return this.usersService.updateUser(id, userData);
  }
  // delete a user
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): string {
    // const parsedId =parseInt(id, 10);
    return this.usersService.deleteUser(id);
  }
}
