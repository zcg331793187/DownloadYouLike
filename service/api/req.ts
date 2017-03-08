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
    encoding?:string
}


export enum MethodEnum{
    GET,POST
}


function  processOptions(method:MethodEnum,option:IRequestOption,data:Object){



    if(method == MethodEnum.GET){


        option.qs = data;
    }else if(method == MethodEnum.POST){

        option.body = data;


    }else{

        throw ('未知的请求方式');


    }


}




function req(uri:string,data:Object,method:MethodEnum):Promise<Object>{
    var options:IRequestOption = <IRequestOption>{
        uri:uri
    };

    processOptions(method,options,data);



    return rp(options).then((response)=>{

        return Promise.resolve(response);

    }).catch((err)=>{

        return Promise.reject(err);

    });


}


export function httpGet(uri:string,data:Object={}):Promise<Object>{


    return req(uri,data,MethodEnum.GET);


}


export function httpPost(uri:string,data:Object={}):Promise<Object>{

    return req(uri,data,MethodEnum.POST);

}


