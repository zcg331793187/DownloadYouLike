/**
 * Created by zhoucaiguang on 2017/3/8.
 */

import {IConfigs} from '../configs/role';
import * as  zlib from 'zlib';





let url = require('url'); //解析操作url


export function checkUrl(url:string,config:IConfigs,urlAll:string[]):boolean{
    let re:boolean = true;

    for( let i in config.notLikeKeyWord){

        try{
            if(url.indexOf(config.notLikeKeyWord[i])>-1 || urlAll.indexOf(url)>-1){
                re = false;
                break;
            }
        }catch (e){
            console.log('checkUlr'+e);
        }

    }
    if(re){
        for(let j in config.likeKeyWord){
            try{
                if(url.indexOf(config.likeKeyWord[j])>-1){
                    re = true;
                    break;
                }else{
                    re = false;
                }
            }catch (e){
                console.log('checkUlr'+e);
            }


        }

    }

    return re;

}







export function spliceUrl(host:string,uri:string):string{
    let href =null;





    try{
         href = url.resolve(host, uri);
        // console.log(href);

    }catch (e){
        console.warn(e);
        throw 'url error';
        // href = null;
    }




    return href;
}



export function getAllHref($:any,_thisUrl:string,configs:IConfigs,urlAll:string[],urlNow:string[]):string[]{

    let array:string[] = [];

    $('a').each((index,ele)=>{


        if(ele.attribs.href){

      let path:string =   this.spliceUrl(_thisUrl,ele.attribs.href);

      let isOk:boolean  =  this.checkUrl(path,configs,urlAll);

      if(isOk){

          urlAll.push(path);
          urlNow.push(path);
          array.push(path);
      }
        }


    });





    return array;
}


export function  forEachSpliceUrl(url:string,uris:string[]):string[]{

    uris.forEach((item,index)=>{

        uris[index] = this.spliceUrl(url,item);

    });



    return uris;
}


export function handleImagesUrl(url:string,$:any,configs:IConfigs):{list:string[],title:string}{

    let isOk = this.checkImagesKeyWordUrl(url,configs.imagesKeyWordUrl);
    let  imgs:string[] = [];
    let title:string;
    if(isOk){
     imgs =     this.handleImgElement($,configs.imagesInfoElement,configs.imagesAttr,configs.imagesNotDownload);

     // console.log(imgs);
     this.forEachSpliceUrl(url,imgs);
     title =     this.checkFolderNameElement($,configs.FolderNameElement,configs.FolderNamRegExp,configs.FolderNameAttr);
    }



    return {list:imgs,title:title};
}

export function checkImagesKeyWordUrl (url:string,configs:Object):boolean{
    let re:boolean = false;


    for(let  IK in configs){

        if(url.indexOf(configs[IK])>-1){
            re = true;
            break;
        }
    }
    return re;
}


export function checkFolderNameElement(obj:any,ele:string[],RegExp:RegExp,attr:string[]):string{



    let temp:Object;
    let tempString:string =null;



    for (let  i in ele) {
        temp = obj(ele[i]);
        obj((ele[i])).each((id,eles)=>{
            for ( let j in attr){
                if(obj(eles).attr(attr[j])){

                    tempString =   obj(eles).attr(attr[j]);
                    break;

                }
            }


        });

    }






    if (!tempString) {
        tempString = temp['text']();
    }




        if(tempString){

            for( let j in RegExp){

                tempString = this.checkRegExp(tempString,RegExp[j]);

            }
        }






    if(!tempString){
        tempString = '未定义';
    }


    return tempString;
}


export function checkRegExp(str:string,exp:RegExp):string{
    return str.replace(exp,'');
}


export function handleImgElement(obj:any,ele:string[],attr:string[],NotDownload:string[]):string[]{
    let tmp:string[] = [];


    let tmps:string[] = [];
    let tmpsStauts:boolean=true;


    for (let i in ele){
        obj((ele[i])).each(function(id,eles){
            for ( let j in attr){
                if(obj(eles).attr(attr[j])){

                    if(tmp.indexOf(obj(eles).attr(attr[j]))==-1){
                        tmp.push(obj(eles).attr(attr[j]));
                    }

                }
            }

            // return;
        });
    }

    for (let r in tmp){


        for(let t in NotDownload){

            if(tmp[r].indexOf(NotDownload[t])>-1){
                tmpsStauts = false;
                break;
            }



        }
        if(tmpsStauts){
            tmps.push(tmp[r]);
        }
        tmpsStauts =true;

    }

    return tmps;
}

export function sortType(arr:string[],config:string):void{
    if(config=='desc'){
        arr.reverse();
    }else if(config=='asc'){
        arr.sort();
    }
}






export function handleWeiBoImgs(req:Object):string[]{
    let imgs:string[] =[];


    req['cards'].forEach((item)=>{
        // console.log(item['mblog']['pics']);

        if(item['mblog']['pics']){

            item['mblog']['pics'].forEach((item)=>{

                // console.log(item['large']['url']);
                imgs.push(item['large']['url']);
            })

        }



    });

    return imgs;
}

export function handleWeiBoFollows(req:Object):{uid:number,screen_name:string}[]{
    let followList:any[] =[];

    if(req['cardlistInfo'].page){




        if(req['cards']){


    req['cards'].forEach((item)=>{
        // console.log(item['mblog']['pics']);

        if(item['user']){

            followList.push({uid:item['user']['id'],nickName:item['user']['screen_name']});

        }



    });
        }
    }

    return followList;
}


export  function  getContainerId(res:{headers:Object}):string{



    return decodeURIComponent(res.headers['set-cookie'][2]).match(/fid=+[0-9]+/i)[0].replace(/fid=/,'');

}


export async function unzlip(data){

   return  await  zlipPromise(data);
}


const zlipPromise = (data) => {

    return new Promise((resolve, reject) => {
        zlib.gunzip(data, function (err, dezipped) {

            resolve(dezipped);


        });
    });
};

export function checkHttpUrl(urlString){
    if(urlString!=""){
        let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(urlString)){
            return false;
        }else{
            return true;
        }
    }
}