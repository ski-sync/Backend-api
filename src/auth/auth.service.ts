import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const result = { ...user };
      delete result.password;
      const payload = { sub: user.uuid, username: user.name, email: user.email, role: user.rolesUuid };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
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
