import { Injectable } from '@nestjs/common';

// import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}
  // create a new user
  async createUser(createUserDto: CreateUserDto): Promise<user> {
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  const newUser = this.userRepository.create({
    ...createUserDto,
    password: hashedPassword,
  });
  return this.userRepository.save(newUser);
}
  // get all users
  async findAll(): Promise<user[]> {
    return this.userRepository.find();
  }
  // get user by id
  async getUserById(id: number): Promise<user | null> {
    if (!id || isNaN(id)) {
      throw new Error('user not found');
    }
    return this.userRepository.findOneBy({ user_id: id });
  }
  // update user
  async updateUser(id: number, userData: Partial<user>): Promise<user | null> {
    const userToUpdate = await this.userRepository.preload({
      user_id: id,
      ...userData,
    });
    if (!userToUpdate) {
      return null;
    }
    return this.userRepository.save(userToUpdate);
  }
  // delete user
  async deleteUser(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return `User with id ${id} not found`;
    }
    return `User with id ${id} deleted successfully`;
  }
  // search users by email or name
  searchUsers(q: string): Promise<user[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(
        'user.email LIKE :q OR user.first_name LIKE :q OR user.last_name LIKE :q',
        {
          q: `%${q}%`,
        },
      )
      .getMany();
  }
}
