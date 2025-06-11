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
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';

// import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './entities/admin.entity';
// import { createUserDto } from '../users/dto/index';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Roles } from 'src/auth/decorators';
import { RolesGuard } from 'src/auth/guards';
import { AtGuard } from 'src/auth/token/token.guard';
import { Role } from 'src/users/entities/user.entity';

@Controller('admin')
@UseGuards(RolesGuard, AtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // get all admins
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAllAdmins(): IAdmin[] {
    return this.adminService.findAll();
  }
  // get admin by id
  @Roles(Role.ADMIN)
  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number): IAdmin | undefined {
    return this.adminService.getAdminById(id);
  }
  // get admin by searching
  @Roles(Role.ADMIN)
  @Get('search')
  getAdmin(@Query('q') q: string): IAdmin[] {
    return this.adminService.searchAdmins(q);
  }
  // create a new admin
  @Roles(Role.ADMIN)
  @Post()
  createAdmin(@Body() CreateAdminDto: CreateAdminDto): IAdmin {
    return this.adminService.createAdmin(CreateAdminDto);
  }
  // update an admin
  @Roles(Role.ADMIN)
  @Put(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateAdminDto: CreateAdminDto,
  ): { message: string; admin?: IAdmin } {
    return this.adminService.updateAdmin(id, CreateAdminDto);
  }
  // delete an admin
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number): string {
    return this.adminService.deleteAdmin(id);
  }
  // get admin by username
  @Roles(Role.ADMIN, Role.USER)
  @Get('username/:username')
  getAdminByUsername(@Param('username') username: string): IAdmin[] {
    return this.adminService.getAdminByUsername(username);
  }
}
