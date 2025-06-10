import { Module } from '@nestjs/common';
import { userService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([user])],
  providers: [userService],
  controllers: [UsersController],
  exports:[userService],
})
export class UsersModule {}
