/**
 * Created by zhoucaiguang on 2017/3/8.
 */


export  interface IConfigs {
    url?: string,
    imagesKeyWordUrl?: string[],
    likeKeyWord?: string[],
    notLikeKeyWord?: string[],
    imagesInfoElement?: string[]
    imagesAttr?: string[],
    imagesNotDownload?: string[],
    FolderNamRegExp?: any[],
    FolderNameElement?: string[],
    sortType?: string,
    isResetDownImage?: any;
    FolderNameAttr?: string[]
    iSGzip?: boolean,
    urlType?: boolean;
    isSort?: boolean;
    base64?: boolean;
    imagesType?: string[];
    isReturnDownload?: boolean;
    headers?: any;
    iSgb2312?: boolean;
    urlElement?: string[];
    urlAttr?: string[];
    autoNext?: boolean;
    autoLoop?: boolean;
}


export const configs: IConfigs[] = [
    {
        url: 'http://www.xiumm.cc',
        isSort: true,//是否对url进行排序
        base64: false,
        sortType: 'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement: ['td img', 'img'], //jq获取图片元素
        imagesKeyWordUrl: ['photo'],//图片页面的url关键词
        imagesAttr: ['src', 'href'],// 完成
        imagesType: ['png', 'jpg'],
        imagesNotDownload: ['logo.png', 'pixel.png'],
        isReturnDownload: false,
        headers: {Referer: ''},//未重写
        iSgb2312: false,//未重写
        FolderNameElement: ['div.inline'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp: ["/\s/g", "/\//g"],
        urlElement: ['a'],
        urlAttr: ['href'],
        likeKeyWord: ['.html', 'photo'],
        notLikeKeyWord: ['#', 'javascript'],
        autoNext: false,//是否请求完所有url后执行下一个配置项
        autoLoop: false,//遍历所有url后重新webRoot请求
    },
    {
        url: 'http://www.xiuren.org',
        isSort: true,//是否对url进行排序
        base64: false,
        sortType: 'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement: ['.photoThum a'], //jq获取图片元素
        imagesKeyWordUrl: ['.html'],//图片页面的url关键词
        imagesAttr: ['href'],// 完成
        imagesType: ['jpg'],
        imagesNotDownload: ['logo.png', 'pixel.png'],
        isReturnDownload: false,
        headers: {Referer: ''},//未重写
        iSgb2312: false,//未重写
        FolderNameElement: ['title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp: ["/\s/g,/\//g", "/XiuRen.org/g", "/秀人网$/"],

        isResetDownImage: false,
        urlElement: ['a'],
        urlAttr: ['href'],
        likeKeyWord: ['.html'],
        notLikeKeyWord: ['#', 'javascript', 'download', 'Video', '108tv'],
        autoNext: false,//是否请求完所有url后执行下一个配置项
        autoLoop: true,//遍历所有url后重新webRoot请求
    },
    {
        url: 'http://www.beautylegmm.com',
        isSort: true,//是否对url进行排序
        base64: false,
        sortType: 'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement: ['.post a'], //jq获取图片元素
        imagesKeyWordUrl: ['.html'],//图片页面的url关键词
        imagesAttr: ['href'],// 完成
        imagesType: ['jpg'],
        imagesNotDownload: ['logo.png', 'pixel.png', 'thumb', 'php', 'page'],
        isReturnDownload: false,
        headers: {Referer: ''},//未重写
        iSgb2312: false,//未重写
        FolderNameElement: ['.title h2'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp: ["/\s/g", "/\//g"],
        isResetDownImage: false,
        urlElement: ['a'],
        urlAttr: ['href'],
        likeKeyWord: ['.html'],
        notLikeKeyWord: ['#', 'javascript', 'jpg'],
        autoNext: false,//是否请求完所有url后执行下一个配置项
        autoLoop: true,//遍历所有url后重新webRoot请求
    },




];