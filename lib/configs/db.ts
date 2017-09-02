//if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
// fix production env run migration and seeds
require('dotenv').config();

interface Iconfig {
    username: string;
    password?: string;
    database: string;
    host?: string;
    dialect: string;
    pool?: any;
    seederStorage?: string;
}
interface Iconfigs {
    development: Iconfig;
    test: Iconfig;
    production: Iconfig;
}
export const dbConfig: Iconfigs = {
    development: {
        username: process.env.DATABASE_USERNAME_DEV,
        password: process.env.DATABASE_PASSWORD_DEV,
        database: process.env.DATABASE_NAME_DEV,
        host: process.env.DATABASE_HOST_DEV,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        seederStorage: 'sequelize'
    },
    test: {
        username: process.env.DATABASE_USERNAME_TEST,
        password: process.env.DATABASE_PASSWORD_TEST,
        database: process.env.DATABASE_NAME_TEST,
        host: process.env.DATABASE_HOST_TEST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        seederStorage: 'sequelize'
    },
    production: {
        username: process.env.DATABASE_USERNAME_PRO,
        password: process.env.DATABASE_PASSWORD_PRO,
        database: process.env.DATABASE_NAME_PRO,
        host: process.env.DATABASE_HOST_PRO,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 5,
            idle: 30000
        },
        seederStorage: 'sequelize'
    }
};
exports.dbConfig = module.exports = dbConfig;
export default dbConfig;
module.exports.dbConfig = dbConfig;
