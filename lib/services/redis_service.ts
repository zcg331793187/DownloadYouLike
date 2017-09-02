import * as Redis from 'ioredis';
export class RedisService {
  private prefix = 'yycrm_';
  public redis: Redis.Redis;
  static inc: any;

  constructor () {
    this.redis = new Redis();
  }
  async get (key: string) {
    return await this.redis.get(this.toKey(key));
  }
  async set (key: string, val: string) {
    return await this.redis.set(this.toKey(key), val);
  }
  async setex (key: string, val: string, expired: number = 3600) {
    return await this.redis.setex(this.toKey(key), expired, val);
  }
  toKey (key: string) {
    return this.prefix + key;
  }
  public static instance () {
    if (!this.inc) {
      this.inc = new RedisService();
    }
    return this.inc;
  }
}
