import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RolesGuard } from 'src/auth/guards';

@Module({
  imports:[TypeOrmModule.forFeature([user]),JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService,AtStrategy,RolesGuard],
  exports:[RolesGuard]
})
export class AdminModule {}
