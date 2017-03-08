/**
 * Created by zhoucaiguang on 2017/3/8.
 */

import {httpGet} from './req';
import {configs} from '../configs/role';
import  * as cheerio  from 'cheerio';
import * as Tool from '../utils/Tool';
import {IConfigs} from '../utils/Tool'
import mysql from '../dbBase/mysql';
import * as Promise from 'bluebird';

export class robot{

    urlAll:string[] = [];
    urlNow:string[] = [];
    index:number = 0;
    count:number = 0;
    task:IConfigs;
    url:string;
    db;


    constructor(){








    }


    init(){
        this.db=new mysql();







        // console.log(this.db);
        // console.log(c);



     this.getUrl();

    }


    getUrl(){

        let _this = this;
        console.log('开始时间:', new Date());
        _this.task = configs[_this.index];

    if(_this.urlNow.length==0){
        _this.url = _this.task.url;
    }else{
        _this.url = _this.urlNow.shift();
    }

        console.log('进行地址：',_this.url );
        _this.loopGetUrl(_this.url,_this.task).then((res)=>{
        // console.log(this.urlAll.length);
        console.log('当前时间:', new Date());
        console.log('本次获取新地址数:', res.length);

            _this.db.checkDataAndInsert(res);

        console.log('总源地址数量：',_this.urlAll.length);
        console.log('剩余源地址数量：',_this.urlNow.length);
        console.log('已进行：',_this.count);




            _this.getUrl();
    }).catch((error)=>{
            console.log(error);
        });






    }



    loopGetUrl(url:string,task){

     return    httpGet(url).then((req:string)=>{




         this.count++;

            let $ = cheerio.load(req);
          let  returnURL = Tool.getAllHref($,task,this.urlAll,this.urlNow);



            // console.log(urls);


            return Promise.resolve(returnURL);

        }).catch((err)=>{

         console.log(err);

         return Promise.resolve([]);
     });




    }






}









