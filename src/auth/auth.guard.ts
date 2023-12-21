import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfiguration from 'src/config/jwt.configuration';
import { InvalidToken } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfiguration.KEY)
    private jwtConfig: ConfigType<typeof jwtConfiguration>,
    private prisma: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new Error('Token not found');
    }
    //
    // const invalidToken: InvalidToken = await this.prisma.invalidToken.findUnique({
    //   where: {
    //     token,
    //   },
    // });
    // if (invalidToken) {
    //   throw new UnauthorizedException('Token not valid');
    // }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.jwtConfig.secret });
      request['user'] = payload;
    } catch (e) {
      throw new Error('Token not valid');
    }
    return true;
  }

  private extractBearerToken(authHeader: string): string {
    try {
      const bearer = authHeader.split(' ');
      return bearer[1];
    } catch (e) {
      throw new UnauthorizedException('Token not found');
    }
  }
}
