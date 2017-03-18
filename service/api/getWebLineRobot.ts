/**
 * Created by zhoucaiguang on 2017/3/8.
 */

import {httpGet} from './req';
import {configs,IConfigs} from '../configs/role';
import  * as cheerio  from 'cheerio';
import * as Tool from '../utils/Tool';
import mysql from '../dbBase/mysql';
import * as Promise from 'bluebird';
import * as log4 from 'log4js';
import {log4Config} from '../configs/log4';
let iconv = require('iconv-lite');

export class robot{

    urlAll:string[] = [];
    urlNow:string[] = [];
    index:number = 7;
    count:number = 0;
    task:IConfigs;
    loop:number = 0;
    url:string;
    db;
    log;

    constructor(){




        this.db=new mysql();
        log4.configure(log4Config);
        this.log = log4.getLogger();


    }

    test (){


     let list =    [
         'http://www.xiumm.cc/data/0166/79/14869855439014.jpg',
         'http://www.xiumm.cc/data/0166/79/1486985542263.jpg',
         'http://www.xiumm.cc/data/0166/79/14869855394032.jpg',
         'http://www.xiumm.cc/data/0166/79/14869855434423.jpg',
         'http://www.xiumm.cc/data/0166/82/14869855847266.jpg',
     ];

        // this.db.checkImgDataAndInsert(list,'测试');



  // return  this.db.addImgTitle('123123','http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
  return  this.db.checkImgDataAndInsert(list,'测试');


  // console.log(ddd);
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');



    }

    init(){



      // let ddd =   this.test();
      //
      // console.log(ddd);





     this.getUrl();

    }

    handelAuto(){

    let  task =     configs[this.index];
    if(!task){
        this.index=0;
        return this.handelAuto();
    }

    if(task['autoLoop']==true){
        this.index++;
        console.log(task.url);
        return task;
    }
        this.index++;





        return this.handelAuto();
    }



    getUrl(){


        let _this = this;



    if(_this.urlNow.length==0){
        _this.urlAll =[];
        _this.urlNow =[];
        _this.count =0;
        _this.task = _this.handelAuto();
        _this.url = _this.task.url;
        _this.loop++;






    }else{
        Tool.sortType(_this.urlNow,_this.task.sortType);

        _this.url = _this.urlNow.shift();
    }

        console.log('进行地址：',_this.url );
        _this.loopGetUrl(_this.url,_this.task).then((res:any)=>{
        // console.log(this.urlAll.length);
        // console.log('当前时间:', new Date());
        console.log('本次获取新地址数:', res.length);

        if(res[0]){


            // _this.db.checkDataAndInsert(res[0]);
        }
            // console.log(res);

                    if(res[1]){


            // console.log(res[1]);
            if(res[1].title&&res[1].list.length>0){
                _this.db.checkImgDataAndInsert(res[1].list,res[1].title).then((res)=>{
                    console.log(res);
                });
            }
                    }

        console.log('总源地址数量：',_this.urlAll.length);
        console.log('剩余源地址数量：',_this.urlNow.length);
        console.log('已进行：',_this.count);




            _this.getUrl();
    }).catch((error)=>{
            this.log.error(error);
            console.warn(error);
            _this.getUrl();
        });






    }



    loopGetUrl(url:string,task){

     return    httpGet(url,{},task).then((req:string)=>{


                    if(task.iSgb2312==true){
                        req = iconv.decode(req, 'gb2312');
                    }



         this.count++;


            let $ = cheerio.load(req);
          let  returnURL = Tool.getAllHref($,url,task,this.urlAll,this.urlNow);

          let returnImgURL =  Tool.handleImagesUrl(this.url,$,task);

            // console.log(returnURL);
            // console.log(returnImgURL);


            return Promise.resolve([returnURL,returnImgURL]);

        }).catch((err)=>{
         this.log.error(err);

         // this.urlNow.push(url);
         return Promise.resolve([[0][1]]);
     });




    }






}









