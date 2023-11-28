import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractBearerToken(authHeader: string): string {
    try {
      const bearer = authHeader.split('Bearer ');
      return bearer[1];
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
