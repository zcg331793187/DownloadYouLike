import * as qs from 'qs';

export function queryParse() {
    return (ctx: any, next: any) => {

        if (ctx.request.querystring && ctx.request.querystring.length > 0) {
            ctx.request.query = qs.parse(ctx.request.querystring);
        } else {

            ctx.request.query = {};
        }

        ctx.params = Object.assign({}, ctx.request.query, ctx.request.body);
        return next();
    };
}
