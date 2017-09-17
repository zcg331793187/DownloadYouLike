import db from '../models';
import {RedisService} from './redis_service';
import {HttpService} from './http_service';
import {configs, IConfigs} from '../configs/role';
import {getAllHref, handleImagesUrl, unzlip} from "../utils/img";
const cheerio = require('cheerio');
let iconv = require('iconv-lite');

export class ImgService extends HttpService {

    public cache: RedisService;
    public config: IConfigs;
    public nowUrl: string[];
    public urlAll: string[];

    constructor() {
        super();
        this.cache = RedisService.instance();


    }

    async getConfig() {
        let configIndex: number = await this.cache.get('configIndex');
        console.log(configIndex);
        let index: number = Number(configIndex) ? Number(configIndex) : 0;
        let urlNowLength = await this.cache.llen('urlNow');
        this.config = configs[index];
        let config;
        console.log('urlNowLength', urlNowLength);
        if (urlNowLength == 0) {

            let isAdd = await this.cache.sadd('urlAll', [this.config.url]);
            console.log('idsAdd', isAdd);
            if (isAdd == 0) {
                await this.cache.del('urlAll');
                await this.cache.del('urlNow');
                index += 1;
                config = configs[index];
                if (!config) {
                    index = 0;
                    config = configs[index];
                }
                await   this.cache.set('configIndex', index);

                this.config = config;
                await   this.cache.sadd('urlAll', [this.config.url]);
                await this.cache.lpush('urlNow', this.config.url);
            }


        }


    }


    async run() {
        // await  this.getConfig();

        // console.log( this.config.url);
        // let res =  await this.get(this.config.url);
        // console.log(res);


        /*
         // let config = await this.cache.getObj('config');
         // let nowUrl = await this.cache.getObj('nowUrl');
         let one = await this.cache.sadd('urlAll', ['http://www.2baidu.com']);
         let two = await this.cache.sadd('urlAll', ['http://www.baidu2.com']);
         // let two = await this.cache.sadd('urlAll',[]);
         console.log(!!one);
         console.log(!!two);

         if (one) {
         let url = await this.cache.lpush('urlNow', 'http://www.2baidu.com');

         console.log(url);
         } else {

         let url = await this.cache.lpop('urlNow');
         console.log(url);
         }
         if (two) {
         let url = await this.cache.lpush('urlNow', 'http://www.baidu2.com');
         console.log(url);

         } else {

         let url = await this.cache.lpop('urlNow');
         console.log(url);

         }


         // await this.cache.pop(['urlAll']);

         // 爬过列
         // 待爬队列
         // 已获取过


         console.log(await this.cache.llen('urlNow'));
         let smembers = await this.cache.smembers('urlAll');
         console.log(smembers);
         // await  this.cache.del('urlAll');

         console.log(this.config);
         this.cache.get('')
         */


        // await this.worker();
    }

    async    loopGetUrl(url: string, data: any, task: IConfigs) {
/*
        let returnURL;
        let returnImgURL;
        try {


            let req = await httpGet(url, data, task);


            if (task.iSGzip == true && task.iSgb2312 != true) {
                // req = await unzlip(req);
                // req = iconv.decode(req, 'utf-8');
            }

            if (task.iSgb2312 == true) {
                // req = iconv.decode(req, 'gb2312');
            }


            let $ = cheerio.load(req);
            returnURL = getAllHref($, url, task);


            returnImgURL = handleImagesUrl(url, $, task);


        } catch (error) {

            console.log(error);
            console.log('请求错误');
            returnURL = [0];
            returnImgURL = [1];

        }


        return [returnURL, returnImgURL];
        */

    }

    async worker() {

        let urlNow = await this.cache.lpop('urlNow');
        let config = this.config;
        console.log(urlNow);

        // let data = await  this.loopGetUrl(urlNow, {}, config);

        console.log('worker');



        await this.worker();
    }
}