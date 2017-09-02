import * as Sequelize from 'sequelize';
/**
 * Created by zhoucaiguang on 2017/6/6.
 */

export interface WorkersAttributes {

    jobId?: number;
    jobName?: string;
    jobType?: number;
    data?: string;
    dataJson?: any;
}

export interface WorkersInstance extends Sequelize.Instance<WorkersAttributes> {

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
    let worker = sequelize.define(`workers`, {
        jobId: DataTypes.STRING,
        jobName: DataTypes.STRING,
        jobType: DataTypes.INTEGER,
        data: DataTypes.STRING,
        dataJson: {
            type: DataTypes.VIRTUAL,
            get() {
                if (this.data) {
                    return JSON.parse(this.data);
                } else {
                    return {};
                }
            }
        },
        status: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        endAt: DataTypes.DATE,

    }, {
        instanceMethods: {},
        classMethods: {
            associate(models: any) {

                // associations can be defined here
            }
        }
    });
    return worker;
}
