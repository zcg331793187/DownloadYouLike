/**
 * Created by zhoucaiguang on 2017/3/8.
 */
let ss = 'true';
let url = '[12,123,234,com]';
console.log(checkUrl(url));
function checkUrl(urlString) {
    if (urlString != "") {
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!reg.test(urlString)) {
            return false;
        }
        else {
            return true;
        }
    }
}
let sss = '{Host: \'bcy.net\',Connection: \'keep-alive\',             \'Cache-Control\': \'max-age=0\',             \'Upgrade-Insecure-Requests\': 1,             \'User-Agent\': \'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36\',             Accept: \'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\',             DNT: 1,             Referer: "http://bcy.net/coser",             \'Accept-Encoding\': "gzip, deflate, sdch",             \'Accept-Language\': "zh-CN,zh;q=0.8",             Cookie: "acw_tc=AQAAAFkUAn9CQQQAy8A2t0ryCX7tp5tO; PHPSESSID=3ctpoa25hd88e71c3nvfmejkr0; lang_set=zh; UM_distinctid=15b0601964e3ac-06ca498a41e063-1d3a6853-fa000-15b0601964f9a1; LOGGED_USER=Nn%2Flq9WmWx79eHT71Uf2byw%3D%3Ad2NnyjF654Y2u5RqI81PCA%3D%3D; mobile_set=no; CNZZDATA1257708097=1014489182-1490452282-null%7C1490534094; Hm_lvt_330d168f9714e3aa16c5661e62c00232=1490454419; Hm_lpvt_330d168f9714e3aa16c5661e62c00232=1490538074"         }';
console.log(JSON.parse(sss));
// let  ff = eval("("+ss+")");
// console.log(typeof ff); 
