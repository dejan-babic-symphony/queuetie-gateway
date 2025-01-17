type EnvSchema = {
  NODE_ENV: string;
  GW_HEALTH_PING: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Record<keyof EnvSchema, string | undefined> {}
  }
}

export type HealthConfig = {
  pingUrl: string;
};

export type QueuetieConfig = {
  health: HealthConfig;
};
