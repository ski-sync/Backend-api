import { Injectable } from '@nestjs/common';

@Injectable()
export class InfluxService {
  getHello(): string {
    return 'Hello World!';
  }
}
