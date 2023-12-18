import { Controller, Get } from '@nestjs/common';
import { SmtpService } from './smtp.service';

@Controller()
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @Get()
  getHello(): string {
    return this.smtpService.getHello();
  }
}
