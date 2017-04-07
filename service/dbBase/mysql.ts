/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import  {TitleDb, ImgDb, WeiboDb, ConfigDb} from '../dbBase/SequelizeDb';
// import * as Promise from 'bluebird';
import * as log4 from 'log4js';
import {configs} from "../configs/role";
import {checkHttpUrl} from '../utils/Tool'

let util = require('util');


interface IimgData {
    url: string,
    titleId: number
}
interface IaddImgsData {
    titleId: number
    url: string
}

interface IinsertWeiBoFollowData {
    uid: number
    nickName: string
    containerId: number
}


interface Imysql {
    addImgData (titleId: number, url: string)
    addImgTitle (title: string, imgThums: string)
    checkTtileIsSave(title: string)
    checkImgDataAndInsert(herfs: string[], title: string)
    addImgs (herfs: string[], titleId: number)
    addWeiBoImgs (imgs: string[], titleId: number)
}

export default  class mysql implements Imysql {

    log;

    constructor() {


        this.log = log4.getLogger();
    }


    async addImgData(titleId: number, url: string) {


        return await ImgDb.create({
            'titleId': titleId,
            'url': url
        });
    }


    async addImgTitle(title: string, imgThums: string) {


        return await TitleDb.create({
            'title': title,
            'imgThums': imgThums
        });

    }

    async checkTtileIsSave(title: string) {

        return await TitleDb.findOne({
            'where': {
                'title': title
            }
        })
    }


    async  checkImgDataAndInsert(herfs: string[], title: string) {

        let response: any;
        response = await TitleDb.findOne({'where': {'title': title}});


        try {
            if (!response) {

                // console.log('标题不存在');
                response = await  this.addImgTitle(title, herfs[0]);

                await  this.addImgs(herfs, response.id);//待测试

            } else {

                await this.addImgs(herfs, response.id);


            }
        } catch (err) {

        }


        return response;


    }


    async  addImgs(herfs: string[], titleId: number) {

        let data: IaddImgsData[] = this.handleImgData(herfs, titleId);

        for (let i in data) {
            await this.addImgData(data[i].titleId, data[i].url);
        }

        return [];


    }


    handleImgData(hrefs, title) {
        let data = {};
        hrefs.forEach((item, index) => {
            data = {url: item, titleId: title};
            hrefs[index] = data;


        });


        return hrefs;
    }

    async addWeiBoImgs(imgs: string[], titleId: number) {

        for (let i in imgs) {

            await  ImgDb.create({
                'titleId': titleId, 'url': imgs[i]
            }).catch(error => {
                // console.warn(error);
            })
        }
        return imgs;


    }

    async  getWeiBoFollow(offset: number) {


        return await    WeiboDb.find({'attributes': ['id', 'containerId', 'niceName'], 'limit': 1, offset: offset});


    }


    async  getConfigs(offset: number) {

        let newConfig = false;
        let config: any = await  ConfigDb.findOne({
            'attributes': ['webName', 'config'], 'limit': 1,
            offset: offset,
            'where': {
                'isUse': 1
            }
        });


        if(config){

            newConfig = JSON.parse(config.config);

        }








        return newConfig;
    }

    async insertWeiBoFollow(data: IinsertWeiBoFollowData[]) {


        for (let i in data) {

            await  WeiboDb.create({
                'uid': data[i].uid, 'niceName': data[i].nickName, 'containerId': data[i].containerId
            }).catch(error => {
                // console.warn(error);
            })
        }
        return data;
    }


}

