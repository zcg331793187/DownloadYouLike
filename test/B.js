/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
const A_1 = require('./A');
exports.numberRegexp = /^[0-9]+$/;
class ZipCodeValidatowwr extends A_1.ZipCodeValidator {
    constructor() {
        super();
        // console.log(this.isAcceptable('123'));
    }
}
let ww = new ZipCodeValidatowwr();
console.log(ww);
