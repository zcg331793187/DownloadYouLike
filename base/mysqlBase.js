/**
 * Created by work on 2016/3/21.
 */
//var mysql = require("mysql");
var config = require("./../old-configs").mysqlConfig;

var util = require('util');
var pool;


var mysql = require("mysql");




 pool=mysql.createPool({

    connectionLimit:config.maxSockets,
    host:config.server,
    user:config.user,
    password:config.password,
    port:config.port,
    database:config.database

});

/*
pool.on("connection",function(connection){
    if(connection)
    {
        console.log(connection);
    }
});



pool.getConnection(function(error){
    if(error){
        console.log('数据库连接失败：', error);
        setTimeout(pool , 2000);
    }
});


pool.end(function(error){
    if(error) throw error;
});

pool.on("error",function(error){

    if(error.code==="PROTOCOL_CONNECTION_LOST"){
        //handleError();
    }else{
        throw  error;
    }
})

*/

exports.query=function(sql,data,callback){
      callback = callback || data || sql;

        if( util.isArray( data ) ){
          //  data = pool.escape(data);

        pool.query(sql,data,function(error,result){
            result =   result || error;

                    callback(result);


            });

       }else{
            pool.query(sql,function(error,result){
                result = result || error;

                    callback(result);

            });


        }
};

exports.find=function(sql,data,callback){
    callback = callback || data || sql;
    if(typeof  sql === 'string'){
        sql = sql +" LIMIT 1";
    }
    if( util.isArray( data ) ){

    pool.query(sql,data,function(error,result){
        result =   result || error;

            callback(result);

  })
    }else{
        pool.query(sql,function(error,result){
            result =   result || error;

                callback(result[0]);

        })
    }

};

exports.update=function(sql,data,callback){
        callback = callback || data || sql;

            if( util.isArray( data ) ){

                pool.query(sql,data,function(error,result){
                    result = result || error;

                    callback(result);

                });

            }else{

                pool.query(sql,function(error,result){
                    result = result || error;

                    callback(result);

                });
            }




};




/*
var poolModule = require('generic-pool').Pool;
var pool =  poolModule({
        name:"mysql",
        create:function(callback){

            var Client = require("mysql").createPool;

            var c = new Client();
            c.host = config.server;
            c.user = config.user;
            c.password = config.password;
            c.port = config.port;
            c.database = config.database;
            callback(null,c);
        },
        destroy:function(clinet){
            if(clinet.connected){
                try{
                    clinet.end();
                }
                catch(error){

                }
            }
        },
        max:config.maxSockets,
        idleTimeoutMillis:config.timeout,
        log:false
    });



query =function(sql , data ,callback){
            if( util.isArray(data) ){

                pool.acquire(function(error,client){
                    if(error){
                        callback(error);
                        return false;
                    }
                    client.query(sql , data , function(error,rows){
                       pool.release(client);
                        if(error){

                            callback(error, null);
                            return false;
                        }
                        callback(error,rows);
                    });
                })


            }else{

                    pool.acquire(function(error,client){

                        if(error){
                            data(error);
                            return false;
                        }
                        client.query(sql,function(error,rows){
                            pool.release(client);
                            if(error){
                                data(error,null);
                                return false;
                            }
                            data(error,rows);
                        })

                    })



            }



};
*/
/*
query("select * from node_users ", ['2',1 ] ,function(error,info){

});


pool.acquire(function(error,client){
    if(error){
        throw  error;
    }else{
        client.query("select * from node_users",function(error,rows){
            if(error){
                throw error;
            }else{
                console.log(rows);
            }
        })
    }
})

 */




/*
 conn=mysql.createConnection({
 host:config.server,
 user:config.user,
 password:config.password,
 database:config.database,
 port:config.port
 });


 conn.connect(function(error){
 if(error){
 console.log('数据库连接失败：', error);
 setTimeout(handleError , 2000);
 }
 });

 conn.on("error",function(error){
 if(error.code==="PROTOCOL_CONNECTION_LOST"){
 handleError();
 }else{
 throw  error;
 }
 })

 */
/*
* insertId
* affectedRows
* */
/*
var sql="select * from `node_users`"; //返回结果集
//conn.query(sql,function(error,result){if(error)console.log(error);});

var insertSql = "INSERT INTO `node_users` ( `userName`, `nickName`, `password`, `addTime`) VALUES ('zhou', NULL, '123456', '12312')"; //返回id 和影响行数


var delectSql ="delete  from `node_users` where id=1"; //返回影响行数1
var updateSql = 'UPDATE `node_users` SET `userName`="wqeqwewqe" where `id`="2"'; //更新同样内容成功返回1

conn.query(sql,function(error,result){
    if(error) throw  error;
 //   console.log(result);
    for(var i in result){
        console.log(result[i].id);
        console.log(result[i].userName);
    }
});
    */