/**
 * Created by zhoucaiguang on 2017/3/8.
 */
/**
 * Created by work on 2016/3/21.
 */
"use strict";
let mysql = require('mysql-promise')();
let util = require('util');
const role_1 = require('../configs/role');
const config = role_1.dbConfigs;
mysql.configure({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
});
class mysqlBase {
    constructor() {
    }
    query(sql, data) {
        if (util.isArray(data)) {
            return mysql.query(sql, data);
        }
        else {
            return mysql.query(sql);
        }
    }
    find(sql, data) {
        if (typeof sql === 'string') {
            sql = sql + " LIMIT 1";
        }
        return this.query(sql, data).spread((response) => {
            return response;
        });
    }
    select(sql, data) {
        return this.query(sql, data);
    }
    insert(tableName, fields) {
        let sql = "INSERT INTO ";
        if (typeof tableName === 'string') {
            sql += "`" + tableName + "` ";
        }
        if (typeof fields === 'object') {
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
    update(tableName, fields, where) {
        let sql = "UPDATE `" + tableName + "` SET ";
        if (typeof fields === "object") {
            for (let i in fields) {
                sql += "`" + i + "`" + "=" + "'" + fields[i] + "'" + ",";
            }
        }
        else if (typeof fields === "string") {
            sql += fields;
        }
        sql = sql.replace(/,$/g, "");
        sql += ' WHERE  ';
        sql += where;
        return this.query(sql);
    }
}
exports.mysqlBase = mysqlBase;
/*
export function query(sql: string, data?: any[]): Promise<Object> {


    if (util.isArray(data)) {

        return mysql.query(sql, data);
    } else {

        return mysql.query(sql);

    }


}





export function find(sql: string, data?: any[]): Promise<Object> {
    if (typeof  sql === 'string') {
        sql = sql + " LIMIT 1";
    }


    return this.query(sql, data).spread((response) => {
        return response;
    });
}

export function select(sql: string, data?: any[]): Promise<Object> {


    return this.query(sql, data);
}


export function insert(tableName: string, fields: Object) {
    var sql = "INSERT INTO ";

    if (typeof tableName === 'string') {
        sql += "`" + tableName + "` ";
    }
    if (typeof  fields === 'object') {
        sql += "(";
        for (var i in fields) {
            sql += "`" + i + "`,";
        }

        sql = sql.replace(/,$/g, "");

        sql += ")value(";
        for (var i in fields) {
            sql += "'" + fields[i] + "',";
        }
        sql = sql.replace(/,$/g, "");
        sql += ") ";
    }


    return this.query(sql);
}


export function update(tableName: string, fields: Object, where: string) {
    let sql = "UPDATE `" + tableName + "` SET ";

    if (typeof  fields === "object") {

        for (var i in fields) {

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

*/
