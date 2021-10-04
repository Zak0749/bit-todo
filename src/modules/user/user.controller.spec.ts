import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../db/users.service';
import { User, UserDocument, UserSchema } from '../../db/users.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../utils/TestDb';
import { UserController } from './user.controller';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

describe('User Requests', () => {
  let controller: UserController;
  let users: Model<UserDocument>;

  const createUser = async () => {
    const body = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    await controller.createUser(body);

    const user = await users.findOne({
      username: body.username,
      email: body.email,
    });

    return { sent: body, db: user };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    controller = module.get<UserController>(UserController);
    users = module.get<UsersService>(UsersService).model;
  });

  describe('Post', () => {
    it('should add a user to the database', async () => {
      const user = await createUser();
      expect(user.db).toBeDefined();
      expect(await bcrypt.compare(user.sent.password, user.db.password)).toBe(
        true,
      );
    });

    it('should reject as it is a duplicate', async () => {
      const user = await createUser();
      expect(() => controller.createUser(user.sent)).rejects.toThrowError();
    });

    it('should reject as is invalid schema', async () => {
      await expect(() =>
        controller.createUser({
          email: faker.internet.email(),
          password: faker.internet.password(),
        } as any),
      ).rejects.toThrowError();
    });
  });

  describe('Get', () => {
    it('Should return the created quiz', async () => {
      const user = await createUser();
      controller.getUserWithId(user.db.id);
    });

    it('Should give an error since its a bad id', async () => {
      await createUser();
      controller.getUserWithId(faker.datatype.string(24));
    });
  });
  afterEach(async () => {
    await closeInMongodConnection();
  });
});
