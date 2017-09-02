import db from '../models';


import {EHttpStatus} from '../utils/enums';
import {IHttpResponse} from '../utils/interfaces';
import {RedisService} from '../services/redis_service';

import {firstUpperCase} from '../utils/regex';


export class BaseCtrl {
    public controllerName: string;
    // 是否检查登陆
    public needLogin: boolean = true;
    // 是否检查有权限
    public needCheck: boolean = true;
    public db = db;
    public cache: RedisService = RedisService.instance();

    constructor(public actionName: string, public ctx: any, public next: any) {


        this.controllerName = this.constructor.name.replace('Ctrl', '');
        this.controllerName = firstUpperCase(this.controllerName);

    }

    protected async before() {
        let call_name = `before_${this.actionName}`;

        if ((this as any)[call_name] && typeof (this as any)[call_name] === 'function') {
            return await (this as any)[call_name]();
        } else {
            return true;
        }
    }

    protected _init() {
        console.log('base_init');
    }


    protected async checkAuth() {

        if (this.needLogin || this.needCheck) {


            return true;
        }
        return true;
    }

    public async hello() {
        this.ctx.body = this.controllerName + 'hello world';
        await this.next();
    }

    public  ctxBody(data: any, httpStatus: EHttpStatus, message?: string) {
        let res: IHttpResponse = {};

        res.data = data;
        res.status = httpStatus;
        res.message = message;
        this.ctx.body = res;
    }

    public static go(action: string) {

        const that = this;


        return async (ctx: any, next: any) => {
            let ctrl;
            try {
                ctrl = new that(action, ctx, next);

            } catch (e) {
                console.warn('控制器或者方法不存在');
            }

            ctrl._init();
            // 没有权限
            // 或未登录
            if (!await ctrl.checkAuth()) {
                // ctrl.ctx.body = {};
                return;
            }
            try {
                // 捕捉异常
                if (await ctrl.before()) {

                    await (ctrl as any)[action]();
                }
            } catch (error) {


                (ctrl as any).ctxBody({
                    ctrlName: ctrl.controllerName,
                    action,
                    error: error.toString()
                }, EHttpStatus.ERROR, '未知错误');
                throw JSON.stringify({ctrlName: ctrl.controllerName, action, error: error.toString()});
            }

            // await ctrl.next();
        };

    }
}
