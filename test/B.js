/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
const A_1 = require('./A');
let url = require('url'); //解析操作url
exports.numberRegexp = /^[0-9]+$/;
class ZipCodeValidatowwr extends A_1.ZipCodeValidator {
    constructor() {
        super();
        // console.log(this.isAcceptable('123'));
    }
}
let ww = new ZipCodeValidatowwr();
// console.log(ww);
var href = url.resolve('http://www.rosmm.com/rosimm/2017/02/21/2156.htm', '2156_2.htm');
console.log(href);
