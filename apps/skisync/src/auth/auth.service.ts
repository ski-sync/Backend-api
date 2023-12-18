import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'apps/skisync/src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUser: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne({ email: loginUser.email });
    if (user && user.password === loginUser.password) {
      const result = { ...user };
      delete result.password;
      const payload = { sub: user.uuid, username: user.name, email: user.email, role: user.rolesUuid };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async register(userToRegister: CreateUserDto): Promise<any> {
    const roles = { connect: { name: 'guest' } };
    const user = await this.usersService.createUser({ ...userToRegister, roles });
    const result = { ...user };
    delete result.password;
    return result;
  }
}
