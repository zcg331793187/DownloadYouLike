import * as compose from 'koa-compose';
import {logger} from '../configs/log4';
import {log} from './log';
const bodyParser = require('koa-body');
import {queryParse} from './queryParse';
import {tryVerify} from './jwt';
function initLogger() {
    return (ctx: any, next: any) => {
        // 如果登陆log 待用登陆账号姓名
        if (ctx.state.user) {
            ctx.logger = logger(ctx.state.user.name + ctx.state.user.id);
        } else {
            ctx.logger = logger('img');
        }
        return next();
    };
}

export function middleware() {
    return compose<any>([
        bodyParser({ multipart: true }),
        queryParse(),
        tryVerify(),
        initLogger(),
        log(),
    ]);
}
