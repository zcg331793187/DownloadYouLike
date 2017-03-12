/**
 * Created by zhoucaiguang on 2017/3/8.
 */
/**
 * Created by work on 2016/3/21.
 */


import * as Promise from 'bluebird';


// let mysql = require('mysql-promise')();
let promiseDb = require('promise-mysql');



let util = require('util');


interface db {
    sql: string,
    data?: any[]
}
import {dbConfigs} from '../service/configs/role'
const config = dbConfigs;



let mysql = promiseDb.createPool({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 10
});





interface ImysqlBase{
    query(sql: string, data?: any[]): Promise<Object>;
    find(sql: string, data?: any[]): Promise<Object>;
    select(sql: string, data?: any[]): Promise<Object>;
    insert(tableName: string, fields: Object): Promise<Object>;
    update(tableName: string, fields: Object, where: string):Promise<Object>;
}




class mysqlBase implements  ImysqlBase{



    constructor(){



    }


    query(sql: string, data?: any[]): Promise<Object> {


        if (util.isArray(data)) {

            return mysql.query(sql, data);
        } else {

            return mysql.query(sql);

        }


    }


    find(sql: string, data?: any[]): Promise<Object> {
        if (typeof  sql === 'string') {
            sql = sql + " LIMIT 1";
        }


        return this.query(sql, data).then((response) => {
            return response;
        });
    }


    select(sql: string, data?: any[]): Promise<Object> {


        return this.query(sql, data);
    }


    insert(tableName: string, fields: Object):Promise<Object> {
        let sql = "INSERT INTO ";

        if (typeof tableName === 'string') {
            sql += "`" + tableName + "` ";
        }
        if (typeof  fields === 'object') {
            sql += "(";
            for (let i in fields) {
                sql += "`" + i + "`,";
            }

            sql = sql.replace(/,$/g, "");

            sql += ")value(";
            for (let i in fields) {
                sql += "'" + fields[i] + "',";
            }
            sql = sql.replace(/,$/g, "");
            sql += ") ";
        }


        return this.query(sql);
    }


    update(tableName: string, fields: Object, where: string):Promise<Object> {
        let sql = "UPDATE `" + tableName + "` SET ";

        if (typeof  fields === "object") {

            for (let i in fields) {

                sql += "`" + i + "`" + "=" + "'" + fields[i] + "'" + ",";

            }
        } else if (typeof fields === "string") {
            sql += fields;
        }
        sql = sql.replace(/,$/g, "");
        sql += ' WHERE  ';

        sql += where;


        return this.query(sql);
    }








}




export {mysqlBase};






