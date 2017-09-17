import {db} from "../models/index";
const url = require('url');


export async function getAllPageHref($: any, option: any) {
    let config = option;
    let urls: string[] = [];
    $("a").each(function (idx: number, element: any) {
        if (element.attribs.href) {
            try {
                let pageUrl = url.resolve(config.uri, element.attribs.href);
                urls.push(pageUrl);
            } catch (e) {

            }
        }
    });

    for (let url of urls) {
        let res = await handleTargetUrl(url, config);
        if (res) {


            await db.pageAllUrls.create({url: url});
            await db.pageNowUrls.create({url: url});
        }

    }


}

export function handleImgElement($: any, option: any) {
    let tmp: any[] = [];
    let tmps = [];
    var tmpsStauts = true;
    let attr = option.imagesAttr;
    let ele = option.imagesInfoElement;
    let NotDownload = option.imagesNotDownload;
    let uri = option.uri;
    for (let e of ele) {
        $(e).each(function (id: number, eles: any) {
            for (let j  of attr) {
                if ($(eles).attr(j)) {

                    if (tmp.indexOf($(eles).attr(j)) == -1) {
                        tmp.push($(eles).attr(j));
                    }

                }
            }

            // return;
        });
    }

    // console.log('-------------------');
    for (var r in tmp) {


        for (var t in NotDownload) {

            if (tmp[r].indexOf(NotDownload[t]) > -1) {
                tmpsStauts = false;
                break;
            }


        }
        if (tmpsStauts) {

            tmp[r] = url.resolve(uri, tmp[r]);


            tmps.push(tmp[r]);
        }
        tmpsStauts = true;

    }

    return tmps;
}


export async function handleTargetUrl(urlString: string, config: any) {
    var re = true;


    let dbRes = await db.pageAllUrls.findOne({where: {url: urlString}});

    for (let item of config.notLikeKeyWord) {

        //查询数据库
        //判断是否包含排除关键词
        if (urlString.indexOf(item) > -1) {
            re = false;
            break;
        }

    }
    if (re) {
        if (dbRes) {

            re = false;
        }
    }


    if (re) {
        for (let item of config.likeKeyWord) {


            if (urlString.indexOf(item) == -1) {
                re = false;
                break;
            }

        }
    }


    return re;

}

export function titleNameElement(obj: any, options: any) {

    var j = 0;
    var temp;
    let option = options;
    let ele = option.FolderNameElement;
    let RegExp = option.FolderNamRegExp;
    for (let i of ele) {
        // obj(ele[i]).html();
        temp = obj(i).text();
        if (temp) {

            for (let j of RegExp) {

                temp = regExp(temp, j);

            }
        }
        if (temp) {
            console.log(temp);
            break;
        }


    }
    if (!temp) {
        temp = '未定义';
    }


    return temp;
}

function regExp(str: any, exp: any) {
    return str.replace(exp, '');
}