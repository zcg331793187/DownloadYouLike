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
        user: 'zhoucaiguang@gmail.com',
        pass: '147258369QAZZXC'
    },
    from: 'zhoucaiguang@gmail.com',
    to: '331793187@qq.com', // list of receivers
    time:'y',//y,m,d,h,M,s  //图片文件夹间隔
    afterTime:'M',//y,q,m,w,d,h,M,s
    afterType:'-',
    after:1,
    schedule:[{'second':[60]}],
    scheduleMail:[{'second':[30,60]}],
    archiveSavePath:__dirname+'/zip/'
// :"*/1 * * * *"
};

exports.configs=[{
    webRoot:'http://www.xiumm.cc',
    isSort:true,//是否对url进行排序
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
    FolderNamRegExp:[/\s/g],
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:__dirname+'/uploads/xiumm/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['.html','photo'],
        notLikeKeyWord:['#','javascript']},
    autoNext : false,//是否请求完所有url后执行下一个配置项
    autoLoop : false,//遍历所有url后重新webRoot请求
},{
    webRoot:'http://www.4493.com',
    isSort:true,//是否对url进行排序
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
    imagesSavePath:'.././网站图片/uploads-4493/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['www.4493.com'],
        notLikeKeyWord:['#','javascript','javascript:;']},
    autoNext : true,//是否请求完所有url后执行下一个配置项
    autoLoop : true,//遍历所有url后重新webRoot请求
},{
    webRoot:'http://www.xiaodaimeng.net/',
    isSort:true,//是否对url进行排序
    sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:['li.lazyload img'], //jq获取图片元素
    imagesKeyWordUrl:['.html'],//图片页面的url关键词
    imagesAttr:['src','lazysrc'],// 完成
    imagesType:['png','jpg'],
    imagesNotDownload:['logo.png','pixel.png','grey.gif'],
    isReturnDownload:true,
    headers:{Referer:''},//未重写
    iSgb2312:false,//未重写
    FolderNameElement:['div.picinfo h1'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
    FolderNamRegExp:[/\s/g,/[^\u4e00-\u9fa5]/gm],
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:'.././网站图片/uploads-xiaodaomeng/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['www.xiaodaimeng.net'],
        notLikeKeyWord:['#','javascript','javascript:;']},
    autoNext : true,//是否请求完所有url后执行下一个配置项
    autoLoop : true,//遍历所有url后重新webRoot请求
},{
    webRoot:'http://www.uumeitu.com/',
    isSort:true,//是否对url进行排序
    sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:['div.content img'], //jq获取图片元素
    imagesKeyWordUrl:['.html'],//图片页面的url关键词
    imagesAttr:['src','lazysrc'],// 完成
    imagesType:['png','jpg'],
    imagesNotDownload:['logo.png','pixel.png','grey.gif'],
    isReturnDownload:true,
    headers:{Referer:''},//未重写
    iSgb2312:false,//未重写
    FolderNameElement:['div.title h2'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
    FolderNamRegExp:[/\s/g,/[^\u4e00-\u9fa5]/gm],
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:'.././网站图片/uploads-uumeitu/',//相对路径
    isResetDownImage:false,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['www.uumeitu.com'],
        notLikeKeyWord:['#','javascript','javascript:;']},
    autoNext : false,//是否请求完所有url后执行下一个配置项
    autoLoop : true,//遍历所有url后重新webRoot请求
},
    {
        webRoot:'http://www.chuu.co.kr/product/lingerie2.html?cate_no=33',
        isSort:true,//是否对url进行排序
        sortType:'desc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['td img'], //jq获取图片元素
        imagesKeyWordUrl:['detail.html'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['png','jpg'],
        imagesNotDownload:['.gif'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['div.infoArea h3'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        imagesSavePath:'.././网站图片/uploads-chuu/',//相对路径
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        urlSearchType: {
            likeKeyWord:['www.chuu.co','product','detail'],
            notLikeKeyWord:['#','javascript','javascript:;']},
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        webRoot:'http://www.rosi365.com/',
        isSort:true,//是否对url进行排序
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
        imagesSavePath:'.././网站图片/uploads-rosi/',//相对路径
        isResetDownImage:false,//已实现
        urlElement:['a'],//未实现
        urlAttr:['href'],//未实现
        urlSearchType: {
            likeKeyWord:['www.rosi365.com'],
            notLikeKeyWord:['#','javascript','javascript:;','.jpg']},
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    }
];