import * as rp from 'request-promise';
import * as c from 'cheerio';
enum EMethod {

    get, post, delete, put
}
export class HttpService {


    constructor() {

    }

    private autoParse(body, response, resolveWithFullResponse) {
        if (response.headers['content-type'] === 'application/json') {
            return JSON.parse(body);
        } else if (response.headers['content-type'] === 'text/html') {
            return $.load(body);
        } else {
            return body;
        }
    }






}

