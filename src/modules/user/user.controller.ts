import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from '../../db/users.service';
import { CreateUserDto } from '../../db/create-user.dto';
import { UserDocument } from '../../db/users.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly users: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    try {
      await this.users.create(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Get(':id')
  async getUserWithId(@Param('id') id: string): Promise<UserDocument> {
    try {
      return await this.users.findById(id);
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(
    @Body() { password }: { password: string },
    @Request() { user }: { user: UserDocument },
  ) {
    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException('', 400);
    await this.users.deleteWithId(user.id);
    return;
  }
}
