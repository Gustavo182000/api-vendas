import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}
export default {
  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      password: '4n4rc0',
    },
  },
  driver: 'redis',
} as ICacheConfig;
