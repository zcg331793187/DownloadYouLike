import * as Sequelize from 'sequelize';
/**
 * Created by zhoucaiguang on 2017/6/6.
 */

export interface PageNowUrlsAttributes {

    url?: string;
}

export interface PageNowUrlsInstance extends Sequelize.Instance<PageNowUrlsAttributes> {

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    url?: string;
}


export default function m(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    let pageNowUrls = sequelize.define(`pageNowUrls`, {
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
    return pageNowUrls;
}
