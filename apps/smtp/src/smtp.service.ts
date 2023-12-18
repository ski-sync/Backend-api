import { Injectable } from '@nestjs/common';

@Injectable()
export class SmtpService {
  getHello(): string {
    return 'Hello World!';
  }
}
