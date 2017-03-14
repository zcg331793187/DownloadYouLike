/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import  {TitleDb,ImgDb} from '../dbBase/SequelizeDb';
import * as Promise from 'bluebird';
import * as log4 from 'log4js';

let util = require('util');


// console.log(mysqlBase);


interface IimgData{
    url:string,
    titleId:number
}

export default  class mysql  {

    log;
    constructor() {


        this.log = log4.getLogger();
    }


     addImgData (titleId:number, url:string):Promise<Object>{

        return   ImgDb.create({
            'titleId': titleId,
            'url': url
        });

    }


     addImgTitle (title:string, imgThums:string):Promise<Object>{

        return   TitleDb.create({
            'title': title,
            'imgThums': imgThums
        });



    }


    checkImgDataAndInsert(herfs: string[],title:string) {



        return TitleDb.findOne({
            'where': {
                'title': title
            }
        }).then((response:any)=>{

            if (!response) {

                // console.log('标题不存在');
                this.addImgTitle(title,herfs[0]).then((res:any)=>{



                    this.addImgs(herfs,res.id);//待测试
                }).catch((error)=>{
                    console.warn(error);
                })


            }else{

                this.addImgs(herfs,response.id);




            }



        });







    }



        addImgs (herfs:string[],titleId:number){

        let data:string[]  =   this.handleImgData(herfs,titleId);


        // console.log('待处理图片资源：',data.length);
        // let _this = this;
            if(data.length>0){
                data.forEach((item:any,index)=>{



                    this.addImgData(item.titleId,item.url).then((res)=>{


                        console.log('保存完成');

                    }).catch((error)=>{
                        console.log(error);
                    });


                });
            }

    }


    handleImgData(hrefs,title){
        let  data = {};
        hrefs.forEach((item,index)=>{
              data = {url:item,titleId:title};
            hrefs[index] = data;



        });


        return hrefs;
    }







}

