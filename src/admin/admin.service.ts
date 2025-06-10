import { Injectable } from '@nestjs/common';
// import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  private admin: IAdmin[] = [
    {
      admin_id: 1,
      username: 'admin1',
      email: 'admin1@example.com',
      password: 'password1',
      last_login: new Date(),
    },
    {
      admin_id: 2,
      username: 'admin2',
      email: 'admin2@example.com',
      password: 'password2',
      last_login: new Date(),
    },
    {
      admin_id: 3,
      username: 'admin3',
      email: 'admin3@example.com',
      password: 'password3',
      last_login: new Date(),
    },
    {
      admin_id: 4,
      username: 'admin4',
      email: 'admin4@example.com',
      password: 'password4',
      last_login: new Date(),
    },
    {
      admin_id: 5,
      username: 'admin5',
      email: 'admin5@example.com',
      password: 'password5',
      last_login: new Date(),
    },
  ];
  findAll(): IAdmin[] {
    return this.admin;
  }
  // search admin by username
  searchAdmins(username: string): IAdmin[] {
    return this.admin.filter((admin) => admin.username.includes(username));
  }
  // get admin by id
  getAdminById(id: number): IAdmin | undefined {
    return this.admin.find((admin) => admin.admin_id === id);
  }
  // create a new admin
  createAdmin(admin: IAdmin): IAdmin {
    const newAdmin: IAdmin = {
      ...admin,
      admin_id: this.admin.length + 1,
      last_login: new Date(),
    };
    this.admin.push(newAdmin);
    return newAdmin;
  }
  updateAdmin(
    id: number,
    adminData: UpdateAdminDto,
  ): { message: string; admin?: IAdmin } {
    const adminIndex = this.admin.findIndex((admin) => admin.admin_id === id);
    if (adminIndex === -1) {
      return { message: 'Admin not found' };
    }
    const updatedAdmin = { ...this.admin[adminIndex], ...adminData };
    this.admin[adminIndex] = updatedAdmin;
    return { message: 'Admin updated successfully', admin: updatedAdmin };
  }
  // delete an admin
  deleteAdmin(id: number): string {
    const adminIndex = this.admin.findIndex((admin) => admin.admin_id === id);
    if (adminIndex === -1) {
      return 'Admin not found';
    }
    this.admin.splice(adminIndex, 1);
    return 'Admin deleted successfully';
  }
  // login admin
  loginAdmin(username: string, password: string): IAdmin | string {
    const admin = this.admin.find(
      (admin) => admin.username === username && admin.password === password,
    );
    if (!admin) {
      return 'Invalid username or password';
    }
    // Update last login time

    admin.last_login = new Date();
    return admin;
  }
  // get admn by username
  getAdminByUsername(username: string): IAdmin[] {
    return this.admin.filter((admin) => admin.username === username);
  }
}
