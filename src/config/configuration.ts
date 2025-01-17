import { QueuetieConfig } from './configuration.types';

export default () =>
  ({
    health: {
      pingUrl: process.env.GW_HEALTH_PING ?? 'http://localhost:3000',
    },
  }) satisfies QueuetieConfig;
