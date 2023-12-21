import { Body, Controller, Post, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from '../roles/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  SingIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'user', 'guest'])
  @Post('logout')
  logout(@Headers('authorization') token: string) {
    const jwToken = token.split(' ')[1];
    return this.authService.logout(jwToken);
  }
}
