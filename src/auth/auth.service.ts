import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: DatabaseService,
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
  findToken(token: string): Promise<any> {
    return this.prisma.invalidToken.findUnique({
      where: {
        token,
      },
    });
  }

  async register(userToRegister: CreateUserDto): Promise<any> {
    const roles = { connect: { name: 'guest' } };
    userToRegister.password = await bcrypt.hash(userToRegister.password, 10);
    const user = await this.usersService.createUser({ ...userToRegister, roles });
    const result = { ...user };
    delete result.password;
    return result;
  }

  async logout(token: string): Promise<string> {
    await this.prisma.invalidToken.create({
      data: {
        token,
      },
    });
    return 'Logout success';
  }
}
