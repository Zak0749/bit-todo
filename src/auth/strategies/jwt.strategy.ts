import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../db/users.service';
import * as dotenv from 'dotenv';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: dotenv.config().parsed.SESSION_SECRET,
    });
  }

  async validate({ id }: { id: string }) {
    return this.users.findById(id);
  }
}
