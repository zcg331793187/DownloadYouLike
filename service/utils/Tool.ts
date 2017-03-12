/**
 * Created by zhoucaiguang on 2017/3/8.
 */

import {IConfigs} from '../configs/role';





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
                if(url.indexOf(config.likeKeyWord[j])==-1){
                    re = false;
                    break;
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


    }catch (e){
        console.log(e);
        throw 'url error';
        // href = null;
    }




    return href;
}

export function getAllHref($:any,configs:IConfigs,urlAll:string[],urlNow:string[]):string[]{

    let array:string[] = [];

    $('a').each((index,ele)=>{


      let path:string =   this.spliceUrl(configs.url,ele.attribs.href);
      let isOk:boolean  =  this.checkUrl(path,configs,urlAll);
      if(isOk){
          urlAll.push(path);
          urlNow.push(path);
          array.push(path);
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


export function handleImagesUrl(url:string,$:any,configs:IConfigs){

    let isOk = this.checkImagesKeyWordUrl(url,configs.imagesKeyWordUrl);
    let  imgs:string[] = [];
    let title:string;
    if(isOk){
     imgs =     this.handleImgElement($,configs.imagesInfoElement,configs.imagesAttr,configs.imagesNotDownload);
     this.forEachSpliceUrl(url,imgs);
     title =     this.checkFolderNameElement($,configs.FolderNameElement,configs.FolderNamRegExp);
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


export function checkFolderNameElement(obj:any,ele:string[],RegExp):string{


    let temp:string;
    for (let i in ele){
        // obj(ele[i]).html();
        temp = obj(ele[i]).text();
        if(temp){

            for( let j in RegExp){

                temp = this.checkRegExp(temp,RegExp[j]);

            }
        }
        if(temp){
            console.log(temp);
            break;
        }


    }
    if(!temp){
        temp = '未定义';
    }


    return temp;
}


export function checkRegExp(str:string,exp):string{
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

export function sortType(arr,config){
    if(config=='desc'){
        arr.reverse();
    }else if(config=='asc'){
        arr.sort();
    }
}