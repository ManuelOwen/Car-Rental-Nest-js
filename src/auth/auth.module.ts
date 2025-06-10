import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { user } from '../users/entities/user.entity';
import { AtStrategy, RolesGuard } from './guards';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([user]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, JwtStrategy,RolesGuard],
  exports:[RolesGuard]
})
export class AuthModule {}
