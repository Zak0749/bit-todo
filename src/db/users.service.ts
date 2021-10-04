import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto) {
    await this.userModel.create({
      ...user,
      password: user.password
        ? await bcrypt.hash(user.password, 10)
        : undefined,
    });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findOne(filter?: FilterQuery<UserDocument>) {
    return await this.userModel.findOne(filter);
  }

  async deleteWithId(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  model = this.userModel;
}
