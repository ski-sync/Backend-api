import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    throw new UnauthorizedException();
  }

  async register(email: string, name: string, pass: string): Promise<any> {
    const roles = { connect: { name: 'guest' } };
    const user = await this.usersService.createUser({ email, name, password: pass, roles });
    const result = { ...user };
    delete result.password;
    return result;
  }
}
