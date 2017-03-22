/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import  {TitleDb,ImgDb,WeiboDb} from '../dbBase/SequelizeDb';
// import * as Promise from 'bluebird';
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


    async addImgData (titleId:number, url:string){



        await ImgDb.create({
             'titleId': titleId,
             'url': url
         });
    }


    async addImgTitle (title:string, imgThums:string){



              return  await TitleDb.create({
                    'title': title,
                    'imgThums': imgThums
                });

    }

    async checkTtileIsSave(title) {

     return   await TitleDb.findOne({
            'where': {
                'title': title
            }
        })
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

    async addWeiBoImgs (imgs,titleId:number) {

        for( let i in imgs){

            await  ImgDb.create({
                'titleId': titleId, 'url': imgs[i]}).catch(error=>{
                // console.warn(error);
            })
        }
        return imgs;



    }

  async  getWeiBoFollow(offset){





   let data =   await    WeiboDb.find({'attributes': ['id', 'containerId','niceName'],'limit': 1,offset:offset});


   return data;
    }


   async insertWeiBoFollow (data:Object[]) {



        for( let i in data){

          await  WeiboDb.create({
                'uid': data[i]['uid'], 'niceName': data[i]['nickName'], 'containerId':data[i]['containerId']}).catch(error=>{
                    // console.warn(error);
          })
        }
       return data;
    }



}

