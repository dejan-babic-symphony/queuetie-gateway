import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { HealthConfig, QueuetieConfig } from 'src/config/configuration.types';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly config: ConfigService<QueuetieConfig>,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  public check() {
    const pingUrl = this.getPingUrl();
    return this.health.check([() => this.http.pingCheck('gateway', pingUrl)]);
  }

  private getPingUrl(): string {
    return this.config.get<HealthConfig>('health').pingUrl;
  }
}
