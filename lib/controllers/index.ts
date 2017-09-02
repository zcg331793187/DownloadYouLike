export async function hello(ctx: any, next: any) {
    await next();
    ctx.body = 'hello world';
}


export {BaseCtrl} from './baseCtrl';
