/**
 * Created by zhoucaiguang on 16/7/13.
 */

var fs = require('fs');



fs.stat('./uploads/undefined/logo.png',function (err, stats) {
    if (err) throw err;
    // console.log(data);
    if(stats.isFile()){
        console.log(stats.size);
    }
});




