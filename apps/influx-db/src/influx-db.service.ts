import { Injectable } from '@nestjs/common';

@Injectable()
export class InfluxDbService {
  getHello(): string {
    return 'Hello World!';
  }
}
