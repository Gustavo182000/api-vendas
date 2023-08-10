import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../../config/cache';
class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    console.log(
      '🚀 ~ file: RedisCache.ts:11 ~ RedisCache ~ save ~ value:',
      value,
    );
    console.log('🚀 ~ file: RedisCache.ts:11 ~ RedisCache ~ save ~ key:', key);
  }

  public async recover<T>(key: string): Promise<T | null> {
    return null;
  }

  public async invalidate(key: string): Promise<void> {
    return;
  }
}

export default RedisCache;
