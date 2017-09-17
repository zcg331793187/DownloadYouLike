import * as Redis from 'ioredis';
export class RedisService {
    private prefix = 'img_';
    public redis: Redis.Redis;
    static inc: any;

    constructor() {
        this.redis = new Redis();
    }

    async smembers(key: string) {
        return await this.redis.smembers(this.toKey(key));

    }

    async sadd(key: string, arr: string[],) {
        return await  this.redis.sadd(this.toKey(key), arr);
    }

    async lpush(key: string, value: string) {
        return await  this.redis.lpush(this.toKey(key), value);

    }

    async llen(key: string) {
        return await  this.redis.llen(this.toKey(key));

    }

    async lpop(key: string) {
        return await  this.redis.lpop(this.toKey(key));

    }

    async del(key: string) {
        return await  this.redis.del(this.toKey(key));

    }

    async get(key: string) {
        return await this.redis.get(this.toKey(key));
    }

    async getObj(key: string) {
        return JSON.parse(await this.redis.get(this.toKey(key))) || null;

    }

    async setObj(key: string, value: Object) {

        return await this.redis.set(this.toKey(key), JSON.stringify(value));

    }

    async set(key: string, val: any) {
        return await this.redis.set(this.toKey(key), val);
    }

    async setex(key: string, val: string, expired: number = 3600) {
        return await this.redis.setex(this.toKey(key), expired, val);
    }

    toKey(key: string) {
        return this.prefix + key;
    }

    public static instance() {
        if (!this.inc) {
            this.inc = new RedisService();
        }
        return this.inc;
    }
}
