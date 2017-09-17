import * as Sequelize from 'sequelize';
import {dbConfig} from '../configs';
import {logger} from '../configs';
let config: any = (<any>dbConfig)[process.env.NODE_ENV || 'development'];
export const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool,
    logging:false
});

let fs = require('fs');
let path = require('path');
let basename = path.basename(module.filename);


import * as workers from './workers';
import * as images from './images';
import * as titles from './titles';
import * as pageAllUrls from './pageAllUrls';
import * as pageNowUrls from './pageNowUrls';
import {fail} from "assert";


interface DbConnection {
    workers: Sequelize.Model<workers.WorkersInstance, workers.WorkersAttributes>;
    images: Sequelize.Model<images.ImagesInstance, images.ImagesAttributes>;
    titles: Sequelize.Model<titles.TitlesInstance, titles.TitlesAttributes>;
    pageAllUrls: Sequelize.Model<pageAllUrls.PageAllUrlsInstance, pageAllUrls.PageAllUrlsAttributes>;
    pageNowUrls: Sequelize.Model<pageNowUrls.PageNowUrlsInstance, pageNowUrls.PageNowUrlsAttributes>;
}

export let db: |any = {};
fs
    .readdirSync(__dirname)
    .filter(function (file: string) {
        return (file.indexOf('.') !== 0) && (file !== basename) && ['.ts', '.js'].indexOf(file.slice(-3)) > -1;
    })
    .forEach(function (file: string) {
        let model: any = sequelize['import'](path.join(__dirname, file));
        model.hook('beforeSave', (user: any, options: any) => {
            // fix: mysql 5.7 above parse date error
            if (Object.prototype.toString.call(user.createdAt) === '[object String]') {
                let dt = new Date();
                dt.setTime(Date.parse(user.createdAt));
                user.createdAt = dt;
            }
            user.updatedAt = new Date();
        });
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName: string) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
export default <DbConnection>db;
