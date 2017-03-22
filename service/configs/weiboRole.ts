/**
 * Created by zhoucaiguang on 2017/3/21.
 */

interface Iweibo{
    containerid:string
    jumpfrom:string
    page:number
}



export const followListAPi:string = "http://m.weibo.cn/container/getSecond";

export const followListConfig:Iweibo[]= [
    {containerid:'1005052448582352_-_FOLLOWERS',jumpfrom:'weibocom',page:0}
];

export const weiboUserDataApi:string = 'http://m.weibo.cn/container/getIndex';

export const weiboMobileApi:string = 'http://m.weibo.cn/u/';



