/**
 * Created by zhoucaiguang on 2017/3/8.
 */



export  interface IConfigs{
    url:string,
    imagesKeyWordUrl:string[],
    likeKeyWord:string[],
    notLikeKeyWord:string[],
    imagesInfoElement:string[]
    imagesAttr:string[],
    imagesNotDownload:string[],
    FolderNamRegExp:any[],
    FolderNameElement:string[],
    sortType:string

}


interface IdbConfigs{
    server:string,
    user:string,
    password:string,
    port:number
    database:string,
    maxSockets?:number,
    timeout?:number,
    DB_PREFIX?:string
}

export const dbConfigs:IdbConfigs = {
    server:'localhost',
    user:"root",
    password:"root",
    database:"NodeJs",
    port:3306,
    maxSockets : 10,//pool使用
    timeout : 1,//pool使用
    DB_PREFIX:'node'
};





export const configs = [
    {
        url:'http://www.xiumm.cc',
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
        likeKeyWord:['.html','photo'],
        notLikeKeyWord:['#','javascript'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : false,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.xiuren.org',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.photoThum a'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['href'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.html'],
        notLikeKeyWord: ['#', 'javascript','download','Video','108tv'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : false,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.umei.cc',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['#ArticleId0 img'], //jq获取图片元素
        imagesKeyWordUrl:['.htm'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.ArticleTitle strong'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.htm','gangtai','gaoqing'],
        notLikeKeyWord: ['#', 'javascript','download','Video','108tv'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : false,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://girl-atlas.net/album/576545e158e039318beb3909',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.slide img'], //jq获取图片元素
        imagesKeyWordUrl:['album'],//图片页面的url关键词
        imagesAttr:['src','delay'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.header-right h3'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['album','576545ed58e039318beb3c0b'],
        notLikeKeyWord: ['#', 'javascript','display'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : false,//遍历所有url后重新webRoot请求
    }



];