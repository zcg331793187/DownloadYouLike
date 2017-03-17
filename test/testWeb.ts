/**
 * Created by zhoucaiguang on 2017/3/10.
 */
import {httpGet} from '../service/api/req';

let iconv = require('iconv-lite');




function send(url){

    httpGet(url,{},{iSgb2312:true}).then((req:string)=>{

     var    body = iconv.decode(req, 'gb2312');

        console.log(body);


    }).catch((err)=>{

        console.log(err);
    });
}


send('http://www.rosmm.com');