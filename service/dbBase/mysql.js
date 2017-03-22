/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const SequelizeDb_1 = require('../dbBase/SequelizeDb');
// import * as Promise from 'bluebird';
const log4 = require('log4js');
let util = require('util');
class mysql {
    constructor() {
        this.log = log4.getLogger();
    }
    addImgData(titleId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SequelizeDb_1.ImgDb.create({
                'titleId': titleId,
                'url': url
            });
        });
    }
    addImgTitle(title, imgThums) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.TitleDb.create({
                'title': title,
                'imgThums': imgThums
            });
        });
    }
    checkTtileIsSave(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SequelizeDb_1.TitleDb.findOne({
                'where': {
                    'title': title
                }
            });
        });
    }
    checkImgDataAndInsert(herfs, title) {
        return SequelizeDb_1.TitleDb.findOne({
            'where': {
                'title': title
            }
        }).then((response) => {
            if (!response) {
                // console.log('标题不存在');
                this.addImgTitle(title, herfs[0]).then((res) => {
                    this.addImgs(herfs, res.id); //待测试
                }).catch((error) => {
                    console.warn(error);
                });
            }
            else {
                this.addImgs(herfs, response.id);
            }
        });
    }
    addImgs(herfs, titleId) {
        let data = this.handleImgData(herfs, titleId);
        // console.log('待处理图片资源：',data.length);
        // let _this = this;
        if (data.length > 0) {
            data.forEach((item, index) => {
                this.addImgData(item.titleId, item.url).then((res) => {
                    console.log('保存完成');
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    }
    handleImgData(hrefs, title) {
        let data = {};
        hrefs.forEach((item, index) => {
            data = { url: item, titleId: title };
            hrefs[index] = data;
        });
        return hrefs;
    }
    addWeiBoImgs(imgs, titleId) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i in imgs) {
                yield SequelizeDb_1.ImgDb.create({
                    'titleId': titleId, 'url': imgs[i] }).catch(error => {
                    // console.warn(error);
                });
            }
            return imgs;
        });
    }
    getWeiBoFollow(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield SequelizeDb_1.WeiboDb.find({ 'attributes': ['id', 'containerId', 'niceName'], 'limit': 1, offset: offset });
            return data;
        });
    }
    insertWeiBoFollow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i in data) {
                yield SequelizeDb_1.WeiboDb.create({
                    'uid': data[i]['uid'], 'niceName': data[i]['nickName'], 'containerId': data[i]['containerId'] }).catch(error => {
                    // console.warn(error);
                });
            }
            return data;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mysql;
