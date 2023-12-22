import { Controller, Get, UseGuards } from '@nestjs/common';
import { RunService } from './run.service';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { string } from 'joi';

@Controller('run')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Roles')
export class RunController {
  constructor(private runService: RunService) {}

  @ApiCreatedResponse({ description: "Get all user's runs", type: string })
  @Roles(['admin', 'user'])
  @Get()
  getRuns() {
    return this.runService.getRuns();
  }
}
