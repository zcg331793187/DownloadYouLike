/**
 * Created by zhoucaiguang on 2017/3/10.
 */
import {httpGet} from '../service/api/req';
import * as Promise from 'bluebird';





function send(url){

    httpGet(url).then((req:string)=>{



        console.log(req);


    }).catch((err)=>{

        console.log(err);
    });
}


send('http://www.xiuren.org/category/TuiGirl-2.html');