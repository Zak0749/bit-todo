import { UsersService } from '../../db/users.service';
import { UserController } from './user.controller';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import {
  closeMemoryServer,
  MemoryServer,
} from '../../utils/mongo-memory-server';

describe('/api/user', () => {
  let userController: UserController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, MemoryServer()],
    }).compile();

    userController = module.get<UserController>(UserController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('POST', () => {
    it('should add a user to the database with the given params', async () => {
      const fakeData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await userController.create(fakeData);

      const dbData = await usersService.model.findOne({
        username: fakeData.username,
        email: fakeData.email,
      });

      expect(dbData).toBeTruthy();
      expect(
        await bcrypt.compare(fakeData.password, dbData.password),
      ).toBeTruthy();
    });

    it('should reject as it is a duplicate', async () => {
      const fakeData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await userController.create(fakeData);
      await expect(async () => {
        await userController.create(fakeData);
      }).rejects.toThrowError();
    });
  });

  describe('GET', () => {
    it('should get the created user', async () => {
      const fakeData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const insert = await usersService.model.create(fakeData);

      const res = await userController.get(insert._id);

      expect(res).toEqual({
        username: fakeData.username,
        createdAt: expect.any(String),
      });
    });

    it('should reject as it has a invalid id', async () => {
      const fakeData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await usersService.model.create(fakeData);
      await expect(async () => {
        await userController.get(new Types.ObjectId().toHexString());
      }).rejects.toThrowError();
    });
  });

  describe('DELETE', () => {
    it.todo('should delete the user from the database');

    it.todo('should reject as the user isnt loggedin');
  });

  afterEach(async () => {
    await closeMemoryServer();
  });
});
