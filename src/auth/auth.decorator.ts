import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
