import { Test, TestingModule } from '@nestjs/testing';
import { InfluxController } from './influx.controller';
import { InfluxService } from './influx.service';

describe('InfluxController', () => {
  let influxController: InfluxController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InfluxController],
      providers: [InfluxService],
    }).compile();

    influxController = app.get<InfluxController>(InfluxController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(influxController.getHello()).toBe('Hello World!');
    });
  });
});
