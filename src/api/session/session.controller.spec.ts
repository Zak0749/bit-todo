import { Test } from '@nestjs/testing';
import { SessionController } from './session.controller';
import { SessionModule } from './session.module';
import {
  closeMemoryServer,
  MemoryServer,
} from '../../utils/mongo-memory-server';
import { UsersService } from '../../db/users.service';
import * as faker from 'faker';
import * as jwt from 'jsonwebtoken';

describe('/api/session', () => {
  let sessionController: SessionController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [SessionModule, MemoryServer()],
    }).compile();

    sessionController = module.get<SessionController>(SessionController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(sessionController).toBeDefined();
  });

  describe('POST', () => {
    it('Should return a token', async () => {
      const user = await usersService.model.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      const { access_token } = await sessionController.create(user);

      expect(access_token).toBeDefined();

      const tokenData = jwt.decode(access_token) as { id: string };

      expect(tokenData.id).toEqual(user.id);
    });
  });

  describe('GET', () => {
    it('should return the user', async () => {
      const user = await usersService.model.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      const res = await sessionController.get(user);

      console.log(res);
      expect(res).toEqual({
        lists: [],
        email: user.email,
        username: user.username,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  afterAll(async () => {
    await closeMemoryServer();
  });
});
