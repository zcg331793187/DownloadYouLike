import * as Sequelize from 'sequelize';
/**
 * Created by zhoucaiguang on 2017/6/6.
 */

export interface ImagesAttributes {

    url?: string;
    titleId?: number;
}

export interface ImagesInstance extends Sequelize.Instance<ImagesAttributes> {

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    url?: string;
    titleId?: number;
}


export default function m(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    let images = sequelize.define(`images`, {
        url: DataTypes.STRING,
        titleId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    }, {
        paranoid: true,
        instanceMethods: {},
        classMethods: {
            associate(models: any) {

                // associations can be defined here
            }
        }
    });
    return images;
}
