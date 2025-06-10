import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export type JWTPayload = {
  sub: number;
  role: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
    if (!secret) {
      throw new Error(
        'JWT_ACCESS_TOKEN_SECRET is not defined in environment variables',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //bearer token extraction from Authorization header
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'), // Access token secret key
    });
  }

  validate(payload: JWTPayload) {
    return payload; // Return the payload directly, which contains user information
  }
}
