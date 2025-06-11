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
  ParseIntPipe,
} from '@nestjs/common';
import { userService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, user } from './entities/user.entity';
import { Public, Roles } from 'src/auth/decorators';
import { AtGuard } from 'src/auth/token/token.guard';
import { RolesGuard } from 'src/auth/guards';

import { ApiBearerAuth } from '@nestjs/swagger';
// import { Throttle } from '@nestjs/throttler';
 // Limit to 3 requests per 20 seconds
@Controller('users')
@ApiBearerAuth()
@UseGuards(AtGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: userService) {}

  // get all users
  // @Throttle(3, 60)
  @Get()
  @Roles(Role.ADMIN)
  async findAllUsers(): Promise<user[]> {
    return this.usersService.findAll();
  }
  // get user by searching
  @Get('search')
  @Roles(Role.ADMIN, Role.USER)
  async searchUsers(@Query('q') q: string): Promise<user[]> {
    return this.usersService.searchUsers(q);
  }

  // get user by id
  @Get(':id')
  @Roles(Role.ADMIN)
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<user | null> {
    return this.usersService.getUserById(id);
  }

  // create a new user
  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto): Promise<user> {
    return this.usersService.createUser(createUserDto);
  }

  // update a user
  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<user>,
  ): Promise<user | null> {
    return this.usersService.updateUser(id, userData);
  }

  // delete a user
  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.deleteUser(id);
  }
}
