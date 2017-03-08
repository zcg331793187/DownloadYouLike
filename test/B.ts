/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import {ZipCodeValidator}  from './A';

export const numberRegexp = /^[0-9]+$/;

 class ZipCodeValidatowwr extends ZipCodeValidator {

    constructor(){



        super();
        // console.log(this.isAcceptable('123'));
    }
}

let ww  =new ZipCodeValidatowwr();

console.log(ww);