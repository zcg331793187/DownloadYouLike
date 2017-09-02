const Counter = require('passthrough-counter');
const bytes = require('bytes');
import * as chalk from 'chalk';
export function log() {
    return (ctx: any, next: any) => {
        const start = new Date;
        ctx.logger.info(ctx.method, ctx.originalUrl);
        logParams(ctx);
        return next().then(() => {
            const body = ctx.body;
            const length = ctx.response.length;
            let counter: any;
            if (null == length && body && body.readable) {
                ctx.body = body
                    .pipe(counter = Counter())
                    .on('error', ctx.onerror);
            }
            const res = ctx.res;
            const onfinish = done.bind(null, 'finish');
            const onclose = done.bind(null, 'close');
            res.once('finish', onfinish);
            res.once('close', onclose);
            function done(event: string) {
                res.removeListener('finish', onfinish);
                res.removeListener('close', onclose);
                ilog(ctx, start, counter ? counter.length : length, null, event);
            }
        }, (err: any) => {
            ilog(ctx, start, null, err);
            throw err;
        });
    };
}

function logParams(ctx: any) {
    if (ctx.params && Object.keys(ctx.params).length > 0) {
        ctx.logger.info(' params:', toLog(ctx.params));
    }
}

function toLog(params: any) {
    let str = '{';

    for (let key of Object.keys(params)) {

        str += `, ${key}: `;
        if (Object.prototype.toString.call(params[key]) === '[object Array]') {
            str += JSON.stringify(params[key]);
        } else if (Object.prototype.toString.call(params[key]) === '[object Object]') {
            str += toLog(params[key]);
        } else {

            if (params[key]) {
                str += String(params[key]).slice(0, 30);

            }
        }
    }
    str += '}';

    return str;
}

function ilog(ctx: any, start: any, len: any, err: any, event: any = null) {
    const status = err ? (err.status || 500) : (ctx.status || 404);
    let length: any;
    if (~[204, 205, 304].indexOf(status)) {
        length = '';
    } else if (null == len) {
        length = '-';
    } else {
        length = bytes(len);
    }
    const upstream = err ? chalk.red('xxx')
        : event === 'close' ? chalk.yellow('-x-')
            : chalk.gray('-->');
    if (err) {
        ctx.logger.error(
            upstream, chalk.bold(ctx.method),
            chalk.gray(ctx.originalUrl),
            status,
            time(start),
            length
        );
    } else {
        ctx.logger.info(
            upstream, chalk.bold(ctx.method),
            chalk.gray(ctx.originalUrl),
            status,
            time(start),
            length
        );
    }
}
function time(start: number) {
    const delta = (new Date).getTime() - start;
    return (delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's');
}
