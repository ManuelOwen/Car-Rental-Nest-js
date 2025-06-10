import { Injectable, ParseIntPipe } from '@nestjs/common';
import { CreateGuestUserDto } from './dto/create-guest_user.dto';
import { UpdateGuestUserDto } from './dto/update-guest_user.dto';

@Injectable()
export class GuestUsersService {
  private guestUsers = [
    {
      guest_id: 1,
      email: 'johndoe@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      phone_number: 1234567890,
    },
    {
      guest_id: 2,
      email: 'janedoe@gmail.com',
      first_name: 'Jane',
      last_name: 'Doe',
      phone_number: 9876543210,
    },
    {
      guest_id: 3,
      email: 'janedoe@gmail.com',
      first_name: 'Jane',
      last_name: 'Doe',
      phone_number: 9876543210,
    },
    {
      guest_id: 4,
      email: 'janedoe@gmail.com',
      first_name: 'Jane',
      last_name: 'Doe',
      phone_number: 9876543210,
    },
    {
      guest_id: 5,
      email: 'janedoe@gmail.com',
      first_name: 'Jane',
      last_name: 'Doe',
      phone_number: 9876543210,
    },
  ];
  // get all guest users
  findAll() {
    return this.guestUsers;
  }
  // get guest user by id
  findOne(id: number, parseIntPipe: ParseIntPipe) {
    const guestUser = this.guestUsers.find((user) => user.guest_id === id);
    if (!guestUser) {
      return { message: 'Guest user not found' };
    }
    return guestUser;
  }
  // create guest user
  create(createGuestUserDto: CreateGuestUserDto) {
    const newGuestUser = {
      ...createGuestUserDto,
    };
    this.guestUsers.push(newGuestUser);
    return {
      message: 'Guest user created successfully',
      guest: newGuestUser,
    };
  }

  updateGuest(id: number, updateGuestUserDto: UpdateGuestUserDto) {
    const userIndex = this.guestUsers.findIndex((user) => user.guest_id === id);
    if (userIndex !== -1) {
      this.guestUsers[userIndex] = {
        ...this.guestUsers[userIndex],
        ...updateGuestUserDto,
      };
      return {
        message: 'Guest user updated successfully',
        guest: this.guestUsers[userIndex],
      };
    }
    return { message: 'Guest user not found' };
  }

  //  delete guest user
  deleteGuest(id: number): { message: string } {
    const userIndex = this.guestUsers.findIndex((user) => user.guest_id === id);
    if (userIndex !== -1) {
      this.guestUsers.splice(userIndex, 1);
      return { message: 'Guest user deleted successfully' };
    }
    return { message: 'Guest user not found' };
  }
}
