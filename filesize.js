/**
 * Created by zhoucaiguang on 16/8/2.
 */

"use strict";

var fs = require('fs');
var compressionData = require('./action/compressionData').compression;

// console.log(path);
var zipSize=0;





var JSZip = require('jszip');
var fs = require('fs');
var zip = new JSZip();

// zip.file('test.txt', 'hello there');

var s=fs.stat('www',function(err,data){
    console.log();
});
console.log(s);
return;
var imgs = fs.readdirSync("uploads/xiumm/1470122520");
console.log(imgs);
    imgs.forEach(function(file){
       console.log("uploads/xiumm/1470122520"+file);
        var ee = fs.readdirSync("uploads/xiumm/1470122520/"+file);
        ee.forEach(function(files){
            console.log(files);
            zip.folder("images/"+file).file(files, fs.readFileSync("uploads/xiumm/1470122520/"+file+'/'+files));

        })
    });

var data = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFile('demo.zip', data, 'binary', function(){
    console.log('success');
});


return;

var Archiver = require('archiver');
var ArchiverZip = require('archiver-zip');

new Archiver()
    .src('zip/*.zip')
    .pipe(archive.dest('archive.zip'))
    .use(ArchiverZip())
    .run();
return;




var Zip = require('zip-archiver').Zip;

var zip = new Zip({
    file: 'file.zip',
    root: 'opt_root_path'
});
zip.add('file1.txt');
zip.add('file2.txt');
zip.add('folder1/');
zip.add('folder2/', function() {
    zip.done();
    console.log('done.');
});


return;



/*
    path.forEach(function(file){
        console.log(file);
        fs.stat('./uploads/xiumm/'+file,function (err, stats) {

            if (err){
                // throw err;
                console.log('localFileSize异常');
            }
            // console.log(stats.isFile());
            // console.log(stats.size);
            if(stats.isDirectory()){
                f=f+stats.size;


                if(f<6000){
console.log(f);
                    return;
                    // if(stats.size<4000&&f<4000){
                    //     f+=stats.size;
                    console.log(stats.size);
                    fs.rename('./uploads/xiumm/'+file, './imagetemp/'+file, function(err){
                        if (err) throw err;
                        console.log('重命名完成');
                        console.log("%s is file", file);
                    });
                    // }
                }else{
                    console.log('开始压缩文件');
                    console.log(f);
                   console.log('----------结束');
                }
            }



            // console.log(data);
        });
    });

*/

compressionData.start(__dirname+'/uploads/xiumm/','text.zip',function(){
    console.log('压缩成功');
});
return;


// compressionData.start('imagetemp/xiumm','text.zip',function(){
//     console.log('压缩成功');
// });
//
// return;
var path = fs.readdirSync('./uploads/xiumm/');

path.forEach(function(file){
    // console.log(file);
    if(file != '.DS_Store'&&zipSize<6000){
        var  paths = fs.readdirSync('./uploads/xiumm/'+file);
        var statSync;
        // console.log(paths);
        for (var r=0 in paths){
            if(paths[r] != '.DS_Store'){
                statSync =  fs.statSync('./uploads/xiumm/'+file+'/'+paths[r]);
                if(statSync.isDirectory()){
                    zipSize=zipSize+statSync.size;
                    // console.log('./uploads/xiumm/'+file+'/'+paths[r]);
                    // console.log(zipSize);
                    if(zipSize<5000){
                        // console.log('./uploads/xiumm/'+file+'/'+paths[r]);
                        if(!fs.existsSync('./imagetemp/xiumm/'+file)){
                            fs.mkdir('./imagetemp/xiumm/'+file,'0777', function (err) {
                                if (err) throw err;
                            });
                        }
                        fs.rename('./uploads/xiumm/'+file+'/'+paths[r], './imagetemp/xiumm/'+file+'/'+paths[r], function(err){
                            // if (err) throw err;
                            // console.log('重命名完成');
                            // console.log("%s is file", paths[r]);
                        });

                    }else{
                        console.log('开始压缩');
                        compressionData.start('imagetemp/xiumm/',r+'text.zip',function(){
                            console.log('压缩成功');
                        });
                        break;
                    }
                }
            }


        }


    }


});
return;
for (var s=0 in path){
    var   statSync;

    // console.log(path[s]);
    statSync =  fs.statSync('./uploads/xiumm/1470115560/'+path[s]);
    if(statSync.isDirectory()){

        zipSize=zipSize+statSync.size;
console.log(path[s]);
console.log(zipSize);

        // return;

        if(zipSize<6000){
            console.log(zipSize);
            // return;
            // if(stats.size<4000&&f<4000){
            //     f+=stats.size;
            // console.log(statSync.size);

            fs.rename('./uploads/xiumm/1470115560/'+path[s], './imagetemp/xiumm/'+path[s], function(err){
                if (err) throw err;
                console.log('重命名完成');
                console.log("%s is file", path[s]);
            });


        }else{
            console.log('开始压缩文件');
            console.log(zipSize);
            compressionData.start('imagetemp/xiumm/','text.zip',function(){
                console.log('压缩成功');
            });
            console.log('----------结束');
            break;
        }
        // console.log(path[s]);
        // console.log(statSync.size);

    }





/*
    fs.stat('./uploads/xiumm/'+path[s],function (err, stats) {

        console.log(s);
        return;
        if (err){
            // throw err;
            console.log('localFileSize异常');
        }
        // console.log(stats.isFile());
        // console.log(stats.size);
        if(stats.isDirectory()){
            f=f+stats.size;


            if(f<6000){
                console.log(f);
                return;
                // if(stats.size<4000&&f<4000){
                //     f+=stats.size;
                console.log(stats.size);
                fs.rename('./uploads/xiumm/'+file, './imagetemp/'+file, function(err){
                    if (err) throw err;
                    console.log('重命名完成');
                    console.log("%s is file", file);
                });
                // }
            }else{
                console.log('开始压缩文件');
                console.log(f);
                console.log('----------结束');
            }
        }



        // console.log(data);
    });
    */
}

