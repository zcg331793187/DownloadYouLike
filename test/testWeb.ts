/**
 * Created by zhoucaiguang on 2017/3/10.
 */
import {httpGet} from '../service/api/req';

let iconv = require('iconv-lite');


let imgs = [];
function send(url){

    httpGet(url,{},{
        // iSgb2312:true,

        // headers: {
        // Host:'www.weibo.com',
        // Connection: 'keep-alive',
        // 'Cache-Control': 'max-age=0',
        // 'Upgrade-Insecure-Requests': 1,
    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    // Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
 // DNT: 1,
 // Referer: "http://www.weibo.com/",
 // 'Accept-Encoding': "gzip, deflate, sdch",
 // 'Accept-Language': "zh-CN,zh;q=0.8",
 //            Cookie:"PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=db062132bd2d74f7; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic"
        // }
}).then((req:any)=>{

        console.log(req);


    }).catch((err)=>{

        console.log(err);
    });
}

function getQueryString(string,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = string.match(reg);
    console.log(r);
    if (r != null) return r[2]; return null;
}





send('https://zippler.tuchong.com/');
// send('http://m.weibo.cn/container/getIndex');

// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getSecond?containerid=1005052448582352_-_FOLLOWERS&jumpfrom=weibocom');


