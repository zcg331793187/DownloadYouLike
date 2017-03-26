/**
 * Created by zhoucaiguang on 2017/3/8.
 */

import {httpGet} from './req';
import {configs, IConfigs} from '../configs/role';
import {followListAPi, followListConfig, weiboUserDataApi, weiboMobileApi} from '../configs/weiboRole';
import  * as cheerio  from 'cheerio';
import * as Tool from '../utils/Tool';
import mysql from '../dbBase/mysql';
// import * as Promise from 'bluebird';
import * as log4 from 'log4js';
import {log4Config} from '../configs/log4';
let iconv = require('iconv-lite');
import * as  zlip from 'zlib';

interface ICotainerId {

    containerId: number
    uid: number
}

interface Irobot {
    init(): void
    handelAuto(): void
    getWeiboFollowInit(page: number): void
    getWeiboFollowList(page: number): void
    getWeiboImgInit(page: number, offset: number)
    setTimeout(m: number)
    getWeiboUserContainerId(data:ICotainerId[])
    getWeiboMobileContainerId(data: ICotainerId[])
    getWeiboUrl(page: number, offset: number): Object
}


export class robot implements Irobot {

    urlAll: string[] = [];
    urlNow: string[] = [];
    index: number = 19;
    count: number = 0;
    task: IConfigs;
    loop: number = 0;
    url: string;
    db;
    log;

    constructor() {


        this.db = new mysql();
        log4.configure(log4Config);
        this.log = log4.getLogger();


    }

    test() {


        let list = [
            'http://www.xiumm.cc/data/0166/79/14869855439014.jpg',
            'http://www.xiumm.cc/data/0166/79/1486985542263.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855394032.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855434423.jpg',
            'http://www.xiumm.cc/data/0166/82/14869855847266.jpg',
        ];

        // this.db.checkImgDataAndInsert(list,'测试');


        // return  this.db.addImgTitle('123123','http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        return this.db.checkImgDataAndInsert(list, '测试');


        // console.log(ddd);
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');


    }

    async init() {



        // let ddd =   this.test();
        //


        this.getUrl();


        // this.getWeiboFollowInit(0);
        // this.getWeiboImgInit(0, 0);

    }

    handelAuto() {

        let task = configs[this.index];
        if (!task) {
            this.index = 0;
            return this.handelAuto();
        }

        if (task['autoLoop'] == true) {
            this.index++;
            console.log(task.url);
            return task;
        }
        this.index++;


        return this.handelAuto();
    }

    getWeiboFollowInit(page: number) {


        this.getWeiboFollowList(page).then(res => {
                console.log('关注列表，第'+res.config.page+'页');
            this.getWeiboFollowInit(res.config.page);

        });


    }


    getWeiboImgInit(page: number, offset: number) {

        this.getWeiboUrl(page, offset).then(res => {

            if (res['_data']) {
                if(res['_data']['cardlistInfo']['page']){
                    this.getWeiboImgInit(res.page, offset);
                }else{
                    offset++;
                    this.getWeiboImgInit(0, offset);
                }
            } else {
                offset++;
                this.getWeiboImgInit(0, offset);

            }


        });


    }


    async getWeiboFollowList(page: number) {

        let config: any = followListConfig[0];
        let _data = [];
        let okData;
        let option: any = {};
        let follows: Object[] = [];
        if (config) {


            try {
                let res: string = await httpGet(followListAPi, config, option);


                _data = JSON.parse(res);
                follows = Tool.handleWeiBoFollows(_data);
                okData = await this.getWeiboUserContainerId(follows);
                okData = await this.getWeiboMobileContainerId(okData);


                await this.db.insertWeiBoFollow(okData);
                console.log('请求完一次');

                // console.log(okData);


            } catch (err) {
                console.warn(err.statusCode);
                if (err.statusCode == 403) {
                    console.log('-------------------用户关注列表请求频繁------------------');

                    await this.setTimeout(Math.ceil(Math.random()*120));
                }

            }


        }

        await this.setTimeout(Math.ceil(Math.random()*10));
        console.log('走');
        if (_data['count']) {
            config.page++;
        }
        else {
            config.page=0;
            console.log('end');
        }


        return {config: config, _data: _data};
    }


    async setTimeout(m: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, m * 1000);
        });
    }


    async getWeiboUserContainerId(data) {


        for (let i of data) {

            i.containerId = await httpGet(weiboMobileApi + i.uid, {}, {resolveWithFullResponse: true});
            i.containerId = Tool.getContainerId(i.containerId);

        }


        return data;
    }


    async getWeiboMobileContainerId(data) {
        let temp;

        for (let i of data) {

            temp = await httpGet(weiboUserDataApi, {uid: i.uid, containerid: i.containerId}, {});


            temp = JSON.parse(temp);
            i.containerId = temp['tabsInfo']['tabs'][1]['containerid'];
            await this.setTimeout(10);
        }


        return data;
    }

    async  getWeiboUrl(page, offset) {
        // await this.setTimeout(40);

        let configDb = await  this.db.getWeiBoFollow(offset);
        let idObj: {id:number};
        let config: Object = {};
        let data;

        if (configDb) {


            try {
                config = {page: page, uid: configDb.uid, containerid: configDb.containerId};
                data = await httpGet(weiboUserDataApi, config, {});

                data = JSON.parse(data);

                let imgs = Tool.handleWeiBoImgs(data);

                idObj = await this.db.checkTtileIsSave(configDb.niceName);
                if (!idObj) {
                    idObj = await    this.db.addImgTitle(configDb.niceName, imgs[0]);
                }
                console.log('用户微博:',configDb.niceName,'。第'+page+'页','当前页面图片数:',imgs.length);
                await this.db.addWeiBoImgs(imgs, idObj.id);

            } catch (error) {
                console.warn(error.statusCode);
                if (error.statusCode == 403) {
                    console.log('-------------------用户微博请求频繁------------------');

                    await this.setTimeout(Math.ceil(Math.random()*120));
                }
            }


            page++;
        } else {
            console.log('没有可用微博爬虫配置信息');
            // await this.setTimeout(360);
            // await this.setTimeout(Math.ceil(Math.random()*360));
            offset=0;
        }
        await this.setTimeout(Math.ceil(Math.random()*10));
        // console.log(data);

        return {page: page, _data: data, offset: offset};
    }


    getUrl() {


        let _this = this;


        if (_this.urlNow.length == 0) {
            _this.urlAll = [];
            _this.urlNow = [];
            _this.count = 0;
            _this.task = _this.handelAuto();
            _this.url = _this.task.url;
            _this.loop++;


        } else {
            Tool.sortType(_this.urlNow, _this.task.sortType);

            _this.url = _this.urlNow.shift();
        }

        console.log('进行地址：', _this.url);

        _this.loopGetUrl(_this.url, {}, _this.task).then((res: any) => {

            console.log('本次获取新地址数:', res.length);


            // console.log(res);
            if (res[1]) {


                // console.log(res[1]);
                if (res[1].title && res[1].list.length > 0) {
                    _this.db.checkImgDataAndInsert(res[1].list, res[1].title).then((res) => {
                        // console.log(res);
                    });
                }
            }

            console.log('总源地址数量：', _this.urlAll.length);
            console.log('剩余源地址数量：', _this.urlNow.length);
            console.log('已进行：', _this.count);


            _this.getUrl();
        }).catch((error) => {
            this.log.error(error);
            console.warn(error);
            _this.getUrl();
        });


    }


    async    loopGetUrl(url: string, data, task) {

        let returnURL;
        let returnImgURL;
        try {


            let req = await httpGet(url, data, task);


            if(task.iSGzip==true){
                req = await Tool.unzlip(req);
                req= iconv.decode(req, 'utf-8');
            }

            if (task.iSgb2312 == true) {
                req = iconv.decode(req, 'gb2312');
            }

            this.count++;

            let $ = cheerio.load(req);
            returnURL = Tool.getAllHref($, url, task, this.urlAll, this.urlNow);


            returnImgURL = Tool.handleImagesUrl(this.url, $, task);


        } catch (error) {

            console.log(error);
            returnURL = [0];
            returnImgURL = [1];

        }


        return [returnURL, returnImgURL];


    }


}









