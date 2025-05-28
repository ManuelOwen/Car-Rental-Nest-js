import { Injectable } from '@nestjs/common';
import { CreateGuestUserDto, } from './dto/create-guest_user.dto';
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

// create guest user
  create(createGuestUserDto: CreateGuestUserDto) {
    const newGuestUser = {
      // guest_id: this.guestUsers.length + 1, // Auto-increment ID
      ...createGuestUserDto,
    };
    this.guestUsers.push(newGuestUser);
    return newGuestUser;
  }

  findAll():CreateGuestUserDto[] {
 
    return this.guestUsers;
  }

  findOne(id: number): CreateGuestUserDto | undefined {
    return this.guestUsers.find(user => user.guest_id === id);
  }

  updateGuest(id: number, updateGuestUserDto: UpdateGuestUserDto) {
    const userIndex = this.guestUsers.findIndex(user => user.guest_id === id);
    if (userIndex !== -1) {
      this.guestUsers[userIndex] = { ...this.guestUsers[userIndex], ...updateGuestUserDto };
      return this.guestUsers[userIndex];
    }
  }

//  delete guest user 
 deleteGuest(id:number):string{
   const userIndex = this.guestUsers.findIndex(user => user.guest_id === id);
   if (userIndex !== -1) {
     this.guestUsers.splice(userIndex, 1);
     return 'Guest user deleted successfully';
   }
   return 'Guest user not found';
 }
}
