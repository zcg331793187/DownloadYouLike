/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
exports.dbConfigs = {
    server: 'localhost',
    user: "root",
    password: "root",
    database: "NodeJs",
    port: 3306,
    maxSockets: 10,
    timeout: 1,
    DB_PREFIX: 'node'
};
exports.configs = [
    {
        url: 'http://www.xiumm.cc',
        isSort: true,
        base64: false,
        sortType: 'asc',
        imagesInfoElement: ['td img', 'img'],
        imagesKeyWordUrl: ['photo'],
        imagesAttr: ['src', 'href'],
        imagesType: ['png', 'jpg'],
        imagesNotDownload: ['logo.png', 'pixel.png'],
        isReturnDownload: false,
        headers: { Referer: '' },
        iSgb2312: false,
        FolderNameElement: ['div.inline'],
        FolderNamRegExp: [/\s/g, /\//g],
        timeout: 4000,
        urlTimeout: 4000,
        imgTimeout: 5000,
        imagesSavePath: __dirname + '/uploads/xiumm/',
        isResetDownImage: false,
        urlElement: ['a'],
        urlAttr: ['href'],
        likeKeyWord: ['.html', 'photo'],
        notLikeKeyWord: ['#', 'javascript'],
        autoNext: false,
        autoLoop: false,
    }
];
