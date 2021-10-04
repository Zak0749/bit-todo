import { Injectable } from '@nestjs/common';
import { UsersService } from '../db/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../db/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne({ username });
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login({ id }: UserDocument) {
    return {
      access_token: this.jwtService.sign({ id }),
    };
  }
}
