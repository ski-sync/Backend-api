import { Test, TestingModule } from '@nestjs/testing';
import { InfluxDbController } from './influx-db.controller';
import { InfluxDbService } from './influx-db.service';

describe('InfluxDbController', () => {
  let influxDbController: InfluxDbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InfluxDbController],
      providers: [InfluxDbService],
    }).compile();

    influxDbController = app.get<InfluxDbController>(InfluxDbController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(influxDbController.getHello()).toBe('Hello World!');
    });
  });
});
