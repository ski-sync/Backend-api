import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfiguration from 'src/config/jwt.configuration';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfiguration.KEY)
    private jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const token = this.extractBearerToken(request.headers.authorization);
    console.log(token);

    if (!token) {
      throw new Error('Token not found');
    }

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
      console.log(authHeader);
      const bearer = authHeader.split(' ');
      console.log(bearer);
      return bearer[1];
    } catch (e) {
      throw new UnauthorizedException('Token not found 1212');
    }
  }
}
