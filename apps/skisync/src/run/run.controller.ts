import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { RunService } from './run.service';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { string } from 'joi';
import { Run } from 'lib/interfaces/run.interfaces';
import { randomUUID } from 'crypto';

@Controller('run')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Roles')
export class RunController {
  constructor(private runService: RunService) {}

  @ApiCreatedResponse({ description: "Get all user's runs", type: string })
  @Roles(['admin', 'user'])
  @Get()
  getRuns(@Body() data: any) {
    return this.runService.getRuns(data.bucket_id);
  }

  @ApiCreatedResponse({ description: 'write user run', type: string })
  @Roles(['admin', 'user'])
  @Post('write')
  writeRuns(@Body() data: any) {

    // generate random run data
    const run: Run = {
      id: '1',
      // generate random userID
      userId: randomUUID(),
      runId: randomUUID(),
      points: [],
    }

    for (let i = 0; i < 1000; i++) {
      run.points.push({
        humidity: Math.random() * 100,
        temperature: Math.random() * 100,
        pressure: Math.random() * 100,
        altitude: Math.random() * 100,
        latitude: Math.random() * 100,
        longitude: Math.random() * 100,
        // point timestamp every 2 seconds
        timestamp: Date.now() - i * 1000 * 2,
      })
    }

    return this.runService.writeRuns(run);
  }
}
