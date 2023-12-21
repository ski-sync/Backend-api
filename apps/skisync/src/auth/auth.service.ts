import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'apps/skisync/src/users/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'lib/interfaces/smtp.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject('SMTP_SERVICE')
    private readonly smtpProxy: ClientProxy,
  ) {}

  async signIn(loginUser: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne({ email: loginUser.email });
    if (user && (await bcrypt.compare(loginUser.password, user.password))) {
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
    const roles = { connect: { name: 'user' } };
    userToRegister.password = await bcrypt.hash(userToRegister.password, 10);
    const user = await this.usersService.createUser({ ...userToRegister, roles });
    const result = { ...user };
    delete result.password;
    const payload: User = { email: user.email, name: user.name, token: '12345' };
    this.smtpProxy.emit('send_email', payload);
    return result;
  }
}
