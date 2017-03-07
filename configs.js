/**
 * Created by zhoucaiguang on 16/7/14.
 */
// exports.config={
//     server:'localhost',
//     user:"root",
//     password:"root",
//     database:"nodejs",
//     port:"3306",
//     maxSockets : 10,//pool使用
//     timeout : 我问问1//pool使用
// };
'use strict';
exports.mail={
    service:'Gmail',
    auth:{
        user: '******@gmail.com',
        pass: '**********'
    },
    from: '*****@gmail.com',
    to: '3317931***87@qq.com', // list of receivers
    time:'M',//y,m,d,h,M,s  //图片文件夹间隔
    afterTime:'s',//y,q,m,w,d,h,M,s
    afterType:'-',
    after:30,
    schedule:"*/1 * * * *",
    archiveSavePath:__dirname+'/zip/',
};

exports.mysqlConfig={
    server:'localhost',
    user:"root",
    password:"root",
    database:"NodeJs",
    port:"3306",
    maxSockets : 10,//pool使用
    timeout : 1//pool使用
};
exports.configs=[
    {
    webRoot:'http://www.xiumm.cc',
    isSort:true,//是否对url进行排序
    base64:false,
    sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:['td img','img'], //jq获取图片元素
    imagesKeyWordUrl:['photo'],//图片页面的url关键词
    imagesAttr:['src','href'],// 完成
    imagesType:['png','jpg'],
    imagesNotDownload:['logo.png','pixel.png'],
    isReturnDownload:false,
    headers:{Referer:''},//未重写
    iSgb2312:false,//未重写
    FolderNameElement:['div.inline'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
    FolderNamRegExp:[/\s/g,/\//g],
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:__dirname+'/uploads/xiumm/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['.html','LUGirls'],
        notLikeKeyWord:['#','javascript']},
    autoNext : false,//是否请求完所有url后执行下一个配置项
    autoLoop : false,//遍历所有url后重新webRoot请求
},{
        webRoot:'http://www.xiuren.org',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.photoThum a','img'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['href'],// 完成
        imagesType:['png','jpg'],
        imagesNotDownload:['logo.png','pixel.png'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['#title h1'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        imagesSavePath:__dirname+'/uploads/xiuren/',//相对路径
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        urlSearchType: {
            likeKeyWord:['.html','www.xiuren.org'],
            notLikeKeyWord:['#','javascript']},
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : false,//遍历所有url后重新webRoot请求
    }
,{
    webRoot:'http://www.rosi365.com/',
    isSort:true,//是否对url进行排序
    base64:false,
    sortType:'desc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:['div .ngg-gallery-thumbnail a'], //jq获取图片元素
    imagesKeyWordUrl:['.html'],//图片页面的url关键词
    imagesAttr:['href'],// 完成
    imagesType:['png','jpg'],//未实现
    imagesNotDownload:['.gif','d.jpg','/rosi/'],//已实现
    isReturnDownload:false,//已实现
    headers:{Referer:''},//已实现
    iSgb2312:false,//已实现
    FolderNameElement:['title'],//已实现
    FolderNamRegExp:[/\s/g,/_Rosi天天看/,/\//,/ROSI套图/],//已实现
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:10000,//请求超时
    imagesSavePath:__dirname+'/uploads/xiumm/',//相对路径
    isResetDownImage:false,//已实现
    urlElement:['a'],//未实现
    urlAttr:['href'],//未实现
    urlSearchType: {
        likeKeyWord:['www.rosi365.com'],
        notLikeKeyWord:['#','javascript','javascript:;','.jpg']},
    autoNext : true,//是否请求完所有url后执行下一个配置项
    autoLoop : false,//遍历所有url后重新webRoot请求
},{
    webRoot:'http://www.4493.com',
    isSort:true,//是否对url进行排序
    base64:true,//
    sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:['div.picsbox.picsboxcenter img'], //jq获取图片元素
    imagesKeyWordUrl:['.htm'],//图片页面的url关键词
    imagesAttr:['src','href'],//未重写 完成
    imagesType:['png','jpg'],
    imagesNotDownload:['logo.png','pixel.png','grey.gif'],
    isReturnDownload:false,
    headers:{Referer:'http://www.4493.com/'},//未重写
    iSgb2312:true,//未重写
    FolderNameElement:['div.picmainer h1'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
    FolderNamRegExp:[/\s/g,/[^\u4e00-\u9fa5]/gm],
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:__dirname+'/uploads/xiumm/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['www.4493.com'],
        notLikeKeyWord:['#','javascript','javascript:;','dongmanmeinv','app_down','meishi','']},
    autoNext : true,//是否请求完所有url后执行下一个配置项
    autoLoop : false,//遍历所有url后重新webRoot请求
},{
        webRoot:'http://www.xiaodaimeng.net/',
        isSort:true,//是否对url进行排序
        base64:true,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['li.lazyload img'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['src','lazysrc'],// 完成
        imagesType:['png','jpg'],
        imagesNotDownload:['logo.png','pixel.png','grey.gif'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['div.picinfo h1'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/[^\u4e00-\u9fa5]/gm],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        imagesSavePath:__dirname+'/uploads/xiumm/',//相对路径
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        urlSearchType: {
            likeKeyWord:['www.xiaodaimeng.net'],
            notLikeKeyWord:['#','javascript','javascript:;']},
        autoNext : true,//是否请求完所有url后执行下一个配置项 /优先级第二
        autoLoop : false,//遍历所有url后重新webRoot请求  优先级最高
    }
];
