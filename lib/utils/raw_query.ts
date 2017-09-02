import {sequelize} from '../models';
export async function rawUpdate(instance: any, opts: any = {}) {
    if (Object.keys(opts).length === 0) {
        return;
    }
    let query: string = '';

    for (let k of Object.keys(opts)) {
        if (query.length > 0) {
            query = `${query},`;
        }
        let val = opts[k];
        if (Object.prototype.toString.call(val) === '[object Date]') {
            val = val.toLocaleString();
        }
        query = `${query} ${k} = '${val}'`;
    }
    let raw_query = `update ${instance.Model.tableName} set ${query} where id=${instance.id};`;
    return await sequelize.query(raw_query, {type: sequelize.QueryTypes.UPDATE});
}
