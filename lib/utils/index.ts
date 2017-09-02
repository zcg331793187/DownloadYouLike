import * as bcrypt from 'bcrypt';
const crypto = require('crypto');

const saltRound = 10;

export function encryptPassword(password: string): string {
    let salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(passwdPlain: string, passwdHash: string): boolean {
    return bcrypt.compareSync(passwdPlain, passwdHash);
}

export function md5 (str: string): string {
    let md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

export function getValByKey (obj: any, key: string) {
    let pairs = key.split('.');
    for (let pair of pairs) {
        if (obj) {
            obj = obj[pair];
        } else {
            return null;
        }
    }
    return obj;
}

export function delay (t: any) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

export { rawUpdate } from './raw_query';
