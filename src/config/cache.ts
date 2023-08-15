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
      password: '',
    },
  },
  driver: 'redis',
} as ICacheConfig;
