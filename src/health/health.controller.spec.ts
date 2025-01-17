import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { HealthConfig } from '../config/configuration.types';
import configuration from '../config/configuration';
import { HttpModule } from '@nestjs/axios';

describe('HealthController', () => {
  let healthController: HealthController;
  let configService: ConfigService;
  let healthCheckService: HealthCheckService;
  let httpHealthIndicator: HttpHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        TerminusModule,
        HttpModule,
      ],
      controllers: [HealthController],
    })
      .overrideProvider(HttpHealthIndicator)
      .useValue({ pingCheck: jest.fn() })
      .compile();

    healthController = module.get<HealthController>(HealthController);
    configService = module.get<ConfigService>(ConfigService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    httpHealthIndicator = module.get<HttpHealthIndicator>(HttpHealthIndicator);
  });
  describe('check', () => {
    it('should check http status with configured pingUrl', async () => {
      const definedPingUrl = configService.get<HealthConfig>('health').pingUrl;
      const healthCheckServiceSpy = jest.spyOn(healthCheckService, 'check');

      await healthController.check();

      expect(healthCheckServiceSpy).toHaveBeenCalledTimes(1);
      expect(httpHealthIndicator.pingCheck).toHaveBeenCalledWith(
        'gateway',
        definedPingUrl,
      );
    });
  });
});
