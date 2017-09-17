import db from '../models';
import {RedisService} from './redis_service';
import {getAllPageHref, handleImgElement, titleNameElement} from '../utils/img';
const Crawler = require('crawler');
export class SpiderService {


    constructor() {

    }

    async run() {


        let crawler = new Crawler({
            maxConnections: 10,
            // This will be called for each crawled page
            callback: async function (error: any, res: any, done: any) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;
                    let urls = [];
                    var option = res.options;


                    await getAllPageHref($, option);
                    let nowUrl = await db.pageNowUrls.findOne();

                    let uri = nowUrl.url;

                    if (uri) {
                        let imageUrl: string[] = handleImgElement($, option);
                        if (imageUrl.length > 0) {
                            let title = titleNameElement($, option);

                            let res = await db.titles.findOne({where: {title: title}});
                            if (!res) {
                                let data: any ={title: title, image: imageUrl[0]};
                                res = await db.titles.build(data)
                            }
                            await res.save();

                            // res.id;
                            for (let url of imageUrl) {
                                await db.images.create({titleId: res.id, url: url});

                            }


                            console.log(title);
                        }
                        let obj = option;
                        obj.uri = uri;
                        console.log(imageUrl);


                        crawler.queue(obj);
                        await nowUrl.destroy();
                    }


                    // option.uri = now.shift();


                    // console.log(urls);

                }
                done();
            }
        });


        let config = [
            {
                uri: 'http://www.beautylegmm.com',
                imagesInfoElement: ['.post a'], //jq获取图片元素
                imagesKeyWordUrl: ['.html'],//图片页面的url关键词
                imagesAttr: ['href'],// 完成
                imagesType: ['jpg'],
                imagesNotDownload: ['logo.png', 'pixel.png', 'thumb', 'php', 'page'],
                FolderNameElement: ['.title h2'],
                FolderNamRegExp: ["/\s/g", "/\//g"],

                likeKeyWord: ['.html'],
                notLikeKeyWord: ['#', 'javascript', 'jpg'],
            }

        ];


        crawler.queue(config);


    }
}