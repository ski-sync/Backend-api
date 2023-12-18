import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';

@Controller()
@UseGuards(AuthGuard, RoleGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(['admin', 'user', 'guest'])
  getHello(): string {
    return this.appService.getHello();
  }
}
