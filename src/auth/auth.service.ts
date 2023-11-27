import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  // todo: implement
  constructor() {}

  async signIn(username: string, pass: string): Promise<any> {
    throw new UnauthorizedException('Not implemented {}');
  }
}
