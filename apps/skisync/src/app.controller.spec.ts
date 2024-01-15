import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfiguration from '@lib/config/jwt.configuration';
import { jwtValidationSchema } from '@lib/config/jwt.validation';
import { RoleModule } from './roles/roles.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [jwtConfiguration],
          validationSchema: jwtValidationSchema,
        }),
        JwtModule,
        RoleModule,
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'getHello').mockImplementation(() => 'Hello World!');

      const result = appController.getHello();

      expect(result).toBe('Hello World!');
    });
  });

  // Add more test cases as needed for different scenarios, such as testing the guards, etc.
});
