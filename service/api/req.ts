/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import * as rp from 'request-promise';
import * as Promise from 'bluebird';
import {error} from "util";


export interface IRequestOption{
    uri:string,
    headers?:Object,
    qs?:Object,
    body?:Object,
    json?:boolean,
    encoding?:string,
    iSgb2312?:boolean,
    iSEncoding?:boolean,
    iSGzip?:boolean,
    resolveWithFullResponse?:boolean
}



export enum MethodEnum{
    GET,POST
}


function  processOptions(method:MethodEnum,option:IRequestOption,data:Object,config:IRequestOption){



    if(method == MethodEnum.GET){


        option.qs = data;
    }else if(method == MethodEnum.POST){

        option.body = data;


    }else{

        throw ('未知的请求方式');


    }



    if(config.iSgb2312==true){
        option.encoding = null
    }else if(config.iSEncoding==true) {
        option.encoding = null;
    } else if(config.iSGzip==true){
        option.encoding = null;
    }


    if(config.headers){
        option.headers = config.headers
    }


    // console.log(option);



}




function req(uri:string,data:Object,method:MethodEnum,config:IRequestOption):Promise<Object>{
    var options:IRequestOption = <IRequestOption>{
        uri:uri,
    };

    if(config.resolveWithFullResponse){
        options.resolveWithFullResponse = true
    }


    processOptions(method,options,data,config);



    return rp(options).then((response)=>{



        return Promise.resolve(response);

    }).catch((err)=>{

        return Promise.reject(err);

    });


}


export function httpGet(uri:string,data:Object={},config):Promise<any>{


    return req(uri,data,MethodEnum.GET,config);


}


export function httpPost(uri:string,data:Object={},config):Promise<Object>{

    return req(uri,data,MethodEnum.POST,config);

}


