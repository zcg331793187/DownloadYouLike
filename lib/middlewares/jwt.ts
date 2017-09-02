import {verify} from '../utils/jwt';

import db from '../models';
import {RedisService} from '../services/redis_service';

export function tryVerify() {
    return async (ctx: any, next: any) => {
        let token = ctx.headers['token'];
        let design: any = verify(token);
        if (!ctx.state) ctx.state = {};



        return next();
    };
}
