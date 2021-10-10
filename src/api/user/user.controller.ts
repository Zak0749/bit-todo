import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../db/users.service';
import { CreateUserDto } from '../../db/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../decorators/user';
import { UserDocument } from '../../db/users.schema';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      await this.usersService.create(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      const user = await this.usersService.findById(id);
      return {
        username: user.username,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete(@User() user: UserDocument) {
    await this.usersService.deleteWithId(user.id);
  }
}
