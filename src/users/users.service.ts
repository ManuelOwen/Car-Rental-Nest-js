import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users:IUser[] = [
    {
      user_id:1,
      email:'john@gmail.com',
      password: 'password',
      first_name: 'john ', 
      last_name:'doe',
      status:'active',
      phone_number:12345678,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')
    },
    {
      user_id:2,
      email:'jane@gmail.com',
      password: 'password',
      first_name: 'jane ',
      last_name:'doe',
      status:'active',
      phone_number:12345679,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')
    }, 
    {
      user_id:3,
      email:'jack@gmail.com',
      password: 'password',
      first_name: 'jack ',
      last_name:'doe',
      status:'active',
      phone_number:12345680,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')
    },
    {
      user_id:4,
      email:'jill@gmail.com',
      password: 'password',
      first_name: 'jill ',
      last_name:'doe',
      status:'active',
      phone_number:12345681,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')
    },
    {
      user_id:5,
      email:'jill@gmail.com',
      password: 'password',
      first_name: 'jill ',
      last_name:'doe',
      status:'active',
      phone_number:12345681,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')  
    },
    {
      user_id:6,
      email:'jack@gmail.com',
      password: 'password',
      first_name: 'jack ',
      last_name:'doe',
      status:'active',
      phone_number:12345680,
      profile_picture:'./images',
      last_login: new Date('2023-10-01T10:00:00Z')
    }
  ];
  findAll(): IUser[] {
    return this.users;
  }
  searchUsers(query: string): IUser[] {
    return this.users.filter(user => 
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.last_name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }
  getUserById(id: number): IUser | undefined {
    return this.users.find(user => user.user_id === id);
  }
  createUser(user: IUser): IUser {
    const newUser: IUser = {
      ...user,
      user_id: this.users.length + 1, 
      last_login: new Date(), 
    };
    this.users.push(newUser);
    return newUser;
  }
  updateUser(id: number, userData: Partial<IUser>): IUser | undefined {
    const userIndex = this.users.findIndex(user => user.user_id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const updatedUser = { ...this.users[userIndex], ...userData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  deleteUser(id: number): string {
    const userIndex = this.users.findIndex(user => user.user_id === id);
    if (userIndex === -1) {
      return 'User not found';
    }
    this.users.splice(userIndex, 1);
    return 'User deleted successfully';
  }
  findUserByEmail(email: string): IUser | undefined {
    return this.users.find(user => user.email === email);
  }
  findUserByPhoneNumber(phoneNumber: number): IUser | undefined {
    return this.users.find(user => user.phone_number === phoneNumber);
  }



}