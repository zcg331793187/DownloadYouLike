import * as Router from 'koa-router';

import * as Ctrl from '../controllers';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    require('dotenv').config();

(Router.prototype as any).resources = function (path: string, ctrl: any) {
    this.get(path, ctrl.go('index'));
    this.get(`${path}/:id`, ctrl.go('detail'));
    this.put(`${path}`, ctrl.go('update'));
    this.delete(`${path}`, ctrl.go('destroy'));
    this.post(path, ctrl.go('create'));
};
export function router() {
    const router = new Router({
        prefix: '/api',
    }) as any;


    router.use(async (ctx: any, next: any) => {


        // ctx.set('Access-Control-Allow-Origin', process.env.FRONT_HOST);
        // ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'X-Requested-With,Authorization');
        ctx.set('Access-Control-Allow-Headers', 'X-CSRF-TOKEN');
        ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        ctx.set('Content-Type', 'application/json;charset=utf-8');
        ctx.set('Connection', 'close');
        await next();

    });




    return router;
}



