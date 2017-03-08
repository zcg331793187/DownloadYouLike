/**
 * Created by zhoucaiguang on 2017/3/8.
 */

export  interface IConfigs{
    url:string,
    imagesKeyWordUrl:string[],
    likeKeyWord:string[],
    notLikeKeyWord:string[],
    imagesInfoElement:string[]


}


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