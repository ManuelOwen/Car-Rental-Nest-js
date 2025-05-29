import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';

// import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './entities/admin.entity';
// import { createUserDto } from '../users/dto/index';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // get all admins
  @Get()
  findAllAdmins(): IAdmin[] {
    return this.adminService.findAll();
  }
  // get admin by id
  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number): IAdmin | undefined {
    return this.adminService.getAdminById(id);
  }
  // get admin by searching
  @Get('search')
  getAdmin(@Query('q') q: string): IAdmin[] {
    return this.adminService.searchAdmins(q);
  }
  // create a new admin
  @Post()
  createAdmin(@Body() CreateAdminDto: CreateAdminDto): IAdmin {
    return this.adminService.createAdmin(CreateAdminDto);
  }
  // update an admin
  @Put(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateAdminDto: CreateAdminDto,
  ): IAdmin | undefined {
    return this.adminService.updateAdmin(id, CreateAdminDto);
  }
  // delete an admin
  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number): string {
    return this.adminService.deleteAdmin(id);
  }
  // get admin by username
  @Get('username/:username')
  getAdminByUsername(@Param('username') username: string): IAdmin[] {
    return this.adminService.getAdminByUsername(username);
  }
}
