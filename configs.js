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
//     timeout : 1//pool使用
// };
'use strict';

exports.configs=[{
    webRoot:'http://www.xiumm.cc',
    isSort:false,//是否对url进行排序
    sortType:'desc',//是否对url进行排序 desc 倒序 asc正序
    imagesInfoElement:'td img', //jq获取图片元素
    imagesKeyWordUrl:['photo'],//图片页面的url关键词
    imagesType:['png','jpg'],
    imagesNotDownload:['logo.png','pixel.png'],
    isReturnDownload:true,
    FolderNameElement:['div .inline'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
    timeout:4000,//请求超时
    urlTimeout:4000,//请求超时
    imgTimeout:5000,//请求超时
    imagesSavePath:'./uploads/',//相对路径
    isResetDownImage:true,
    urlElement:['a'],
    urlAttr:['href'],
    urlSearchType: {
        likeKeyWord:['.html'],
        notLikeKeyWord:['#','javascript']},
    autoNext : false,//是否请求完所有url后执行下一个配置项
    autoLoop : true,//遍历所有url后重新webRoot请求
}];