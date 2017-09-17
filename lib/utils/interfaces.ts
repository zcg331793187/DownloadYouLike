export interface IHttpResponse {

    status?: number | string;
    data?: any;
    message?: string;
}

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