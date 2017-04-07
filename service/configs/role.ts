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
    sortType:string,
    autoLoop:boolean,
    FolderNameAttr?:string[]
    iSGzip?:boolean,
    urlType?:string

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
        FolderNamRegExp:["/\s/g","/\//g"],
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
        FolderNamRegExp:["/\s/g,/\//g","/XiuRen.org/g","/秀人网$/"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.html'],
        notLikeKeyWord: ['#', 'javascript','download','Video','108tv'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
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
        url:'http://girl-atlas.net',
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
        FolderNamRegExp:["/\s/g","/\//g"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['album'],
        notLikeKeyWord: ['#', 'javascript','display'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.beautyleg.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.table_all a'], //jq获取图片元素
        imagesKeyWordUrl:['show.php'],//图片页面的url关键词
        imagesAttr:['href'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:["/\s/g","/\//g"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['photo'],
        notLikeKeyWord: ['#', 'javascript','jpg'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.beautylegmm.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.post a'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['href'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.title h2'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:["/\s/g","/\//g"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.html'],
        notLikeKeyWord: ['#', 'javascript','jpg'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.rosmm.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['#imgString img'], //jq获取图片元素
        imagesKeyWordUrl:['.htm','rosimm'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:true,//未重写
        FolderNameElement:['.title h1'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:["/\s/g","/\//g"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.htm'],
        notLikeKeyWord: ['#', 'javascript','jpg'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.177pic.info',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'desc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.entry-content img'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.entry-title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:["/\s/g","/\//g"],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['.html'],
        notLikeKeyWord: ['#', 'javascript','jpg','zh-hant','zh-hans'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.jdlingyu.moe',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.main-body a'], //jq获取图片元素
        imagesKeyWordUrl:['jdlingyu'],//图片页面的url关键词
        imagesAttr:['href'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.main-title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['jdlingyu'],
        notLikeKeyWord: ['#', 'javascript','jpg','png'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://www.rayshen.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.pic-area img'], //jq获取图片元素
        imagesKeyWordUrl:['.html'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page'],
        isReturnDownload:false,
        headers:{Referer:''},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g,/上海睿奢文化传播有限公司/g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['rayshen'],
        notLikeKeyWord: ['#', 'javascript','jpg','png'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://zippler.tuchong.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['zippler'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; version=mobile; webp_enabled=1; __utmt=1; token=5ed294ee28b94c07; __utma=115147160.989767144.1490252469.1490264583.1490273379.3; __utmb=115147160.43.10.1490273379; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g,/-图虫摄影网/g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['zippler.tuchong.com'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://tuchong.com/411015/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['411015'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; version=mobile; webp_enabled=1; __utmt=1; token=5ed294ee28b94c07; __utma=115147160.989767144.1490252469.1490264583.1490273379.3; __utmb=115147160.43.10.1490273379; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['411015'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://madebai.tuchong.com/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['madebai'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['madebai'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://gyeonlee.tuchong.com/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['gyeonlee'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['gyeonlee'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://tuchong.com/267685/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['267685'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['267685'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://tuchong.com/1001612/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['1001612'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['1001612'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://huafox.tuchong.com/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['huafox'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['huafox'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://tuchong.com/455975/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['455975'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['455975'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'https://tuchong.com/1070868/',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.figures-wrapper img'], //jq获取图片元素
        imagesKeyWordUrl:['1070868'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png','pixel.png','thumb','php','page','followers'],
        isReturnDownload:false,
        headers:{Cookie:'PHPSESSID=5uv89fp9c1mj84va2l7k9d63m1; webp_enabled=1; token=e642f7b6b51a0dc3; __utma=115147160.989767144.1490252469.1490252469.1490252469.1; __utmb=115147160.500.10.1490252469; __utmc=115147160; __utmz=115147160.1490252469.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic'},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['meta[name="title"]'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['content'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['1070868'],
        notLikeKeyWord: ['#', 'javascript','jpg','png','albums','followers','tags'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
    },
    {
        url:'http://bcy.net',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['.detail_clickable'], //jq获取图片元素
        imagesKeyWordUrl:['detail'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png'],
        isReturnDownload:false,
        headers: {Host:'bcy.net',Connection:'keep-alive','Cache-Control':'max-age=0','Upgrade-Insecure-Requests':1,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',DNT:1,Referer:"http://bcy.net/coser",'Accept-Encoding':"gzip,deflate,sdch",'Accept-Language':"zh-CN,zh;q=0.8",Cookie:"acw_tc=AQAAAFkUAn9CQQQAy8A2t0ryCX7tp5tO; PHPSESSID=3ctpoa25hd88e71c3nvfmejkr0; lang_set=zh; UM_distinctid=15b0601964e3ac-06ca498a41e063-1d3a6853-fa000-15b0601964f9a1; LOGGED_USER=Nn%2Flq9WmWx79eHT71Uf2byw%3D%3Ad2NnyjF654Y2u5RqI81PCA%3D%3D; mobile_set=no; CNZZDATA1257708097=1014489182-1490452282-null%7C1490534094; Hm_lvt_330d168f9714e3aa16c5661e62c00232=1490454419; Hm_lpvt_330d168f9714e3aa16c5661e62c00232=1490538074"},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.js-post-title'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['text'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['coser','expo'],
        notLikeKeyWord: ['#', 'javascript','novel','illust','tags','.apk','static','p='],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
        iSGzip : true,//经过gzip压缩需要解压
        urlType : true,//
    },
    {
        url:'http://www.zrmm.com',
        isSort:true,//是否对url进行排序
        base64:false,
        sortType:'asc',//是否对url进行排序 desc 倒序 asc正序
        imagesInfoElement:['#picture img'], //jq获取图片元素
        imagesKeyWordUrl:['article'],//图片页面的url关键词
        imagesAttr:['src'],// 完成
        imagesType:['jpg'],
        imagesNotDownload:['logo.png'],
        isReturnDownload:false,
        headers: {},//未重写
        iSgb2312:false,//未重写
        FolderNameElement:['.metaRight h2 a'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNameAttr:['text'],//jq获取标题名元素  思考怎么用数组来搜索多个标题名,匹配到就不匹配后面的元素
        FolderNamRegExp:[/\s/g,/\//g],
        timeout:4000,//请求超时
        urlTimeout:4000,//请求超时
        imgTimeout:5000,//请求超时
        isResetDownImage:false,
        urlElement:['a'],
        urlAttr:['href'],
        likeKeyWord:['zrmm'],
        notLikeKeyWord: ['#', 'javascript','xml'],
        autoNext : false,//是否请求完所有url后执行下一个配置项
        autoLoop : true,//遍历所有url后重新webRoot请求
        iSGzip : false,//经过gzip压缩需要解压
        urlType : true,//
    }




];