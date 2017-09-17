import * as Sequelize from 'sequelize';
/**
 * Created by zhoucaiguang on 2017/6/6.
 */

export interface TitlesAttributes {

    image?: number;
    total?: number;
    title?: string;
}

export interface TitlesInstance extends Sequelize.Instance<TitlesAttributes> {

    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    image?: number;
    total?: number;
    title?: string;
}


export default function m(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    let titles = sequelize.define(`titles`, {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        total: DataTypes.INTEGER,
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
    return titles;
}
