import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { UserDocument } from '../../db/users.schema';
import { User } from '../../decorators/user';

@Controller('api/session')
export class SessionController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@User() user: UserDocument) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(
    @User() { lists, email, username, createdAt, updatedAt }: UserDocument,
  ) {
    return {
      lists,
      email,
      username,
      createdAt,
      updatedAt,
    };
  }
}
