import * as jwt from 'jsonwebtoken';
import {token_secret} from '../configs';

export function sign(data: any) {
    return jwt.sign(data, token_secret, {expiresIn: 60 * 60 * 24 * 30});
}
export function verify(sign: string) {
    try {
        if (sign && sign.length > 0) {
            return jwt.verify(sign, token_secret);
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
}
