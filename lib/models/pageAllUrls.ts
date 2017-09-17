import * as Sequelize from 'sequelize';
/**
 * Created by zhoucaiguang on 2017/6/6.
 */

export interface PageAllUrlsAttributes {

    jobId?: number;
    jobName?: string;
    jobType?: number;
    data?: string;
    dataJson?: any;
}

export interface PageAllUrlsInstance extends Sequelize.Instance<PageAllUrlsAttributes> {

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    jobId?: number;
    jobName?: string;
    jobType?: number;
    data?: string;
    dataJson?: any;
}


export default function m(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    let pageAllUrls = sequelize.define(`pageAllUrls`, {
        url: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        instanceMethods: {},
        classMethods: {
            associate(models: any) {

                // associations can be defined here
            }
        }
    });
    return pageAllUrls;
}
