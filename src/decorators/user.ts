import { createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../db/users.schema';

export const User = createParamDecorator((data, req): Promise<UserDocument> => {
  return req.user;
});
