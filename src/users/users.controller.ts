import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { userService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { user } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

// implement pipes
import { ParseIntPipe } from '@nestjs/common';

@UseGuards(AuthGuard('jwt')) 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: userService) {}
  // get all users
  @Get()
  async findAllUsers(): Promise<user[]> {
    return this.usersService.findAll();
  }
  // get user by searching
  @Get('search')
  async searchUsers(@Query('q') q: string): Promise<user[]> {
    return this.usersService.searchUsers(q);
  }
  // get user by id
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<user | null> {
    // const parsedId = parseInt(id, 10);
    return this.usersService.getUserById(id);
  }
  // create a new user
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<user> {
    return this.usersService.createUser(createUserDto);
  }
  // update a user
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<user>,
  ): Promise<user | null> {
    // const parsedId = parseInt(id, 10);
    return this.usersService.updateUser(id, userData);
  }
  // delete a user
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    // const parsedId =parseInt(id, 10);
    return this.usersService.deleteUser(id);
  }
}
