/**
 * Created by work on 2016/3/21.
 */
var conn = require("./mysqlBase");
//var sql    = 'SELECT * FROM users WHERE id = ' + conn.escape(userId);

/*
conn.query('select * from node_users ',[],function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

});
*/
/*
conn.queryOne('select * from `node_users`  where `password`=? ',['123456'],function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

});
*/
/*
conn.query("select * from `node_users` LIMIT ?,?",[0,3],function(error,data){
   console.log(data);
});
*/

/*conn.query("select * from `node_users`  order by userName asc",function(error,data){
    console.log(data);
});*/




exports.updatePassword=function(passWord,id,callback){
  conn.update("update `node_users` set passWord=? where id = ?",[ passWord , id ,function(error,data){
      callback(error,data);
  }] )
};

exports.updateLoginTime=function(time,id,callback){
    conn.update("update `node_users` set time= ? where id=?",[ time ,id ],function(error,data){
        callback(error,data);
    })
};


exports.updateUserName=function(userName,id,callback){
  conn.update("update `node_users` set userName=? where id = ? ",[userName,id],function(error,data){
      callback(error,data);
  })
};

/*exports.insertUser=function(userName,nickName,passWord,addTime,time,callback){

};*/

function inserUserCB(userName,nickName,passWord,addTime,time,callback){
    conn.query("insert into `node_users`(`userName`,`nickName`,`passWord`,`addTime`,`time`)value(?,?,?,?,?)",[userName,nickName,passWord,addTime,time],function(error,data){
        if(error){
            callback(error);
            return;
        }
        callback(data);
    });
}






exports.inserUser=function(userName,nickName,passWord,addTime,time,callback){
    callback = callback || time || addTime || passWord || nickName || userName;
    conn.query("insert into `node_users`(`userName`,`nickName`,`passWord`,`addTime`,`time`)value(?,?,?,?,?)",[userName,nickName,passWord,addTime,time],function(error,data){


         if(error){
             callback(error);
             return;
         }

        callback(data);

    });
};


exports.find=function(sql,data,callback){
    conn.queryOne(sql,data,function(result){
        callback(result);
    })
};
/**
 *
 * tableName string 'node_text'
 * fields object  or string          {'userId':"123"}
 * where object   or string          {'userId':"123","regexp":"or"}
 * callback function  result
 *
 * @param table_name 表名
 * @param fields 字段
 * @param data 数据
 * @param where
 * @param callback
 */
exports.update=function( table_name ,fields, where ,callback ){
    var sql = "UPDATE `"+table_name+"` SET ";

    if(typeof  fields === "object"){

    for(var i in fields){

        sql+="`"+i+"`"+"="+"'"+fields[i]+"'"+",";

    }
    }else if(typeof fields === "string"){
        sql+= fields;
    }
    sql = sql.replace(/,$/g,"");
    sql+=' WHERE  ';
        if(typeof  where ==='object'){

            for(var i in where){
                    if(i!='regexp'){
                        sql+= i+"="+where[i]+" ";
                    }else{
                        sql+=""+where[i]+" ";
                    }


            }
        }else{
            sql+='  where '+where;
        }


  conn.update(sql,function( result ){
      callback( result );
  });
};


exports.insert=function(table_name ,fields ,callback){
    var sql = "INSERT INTO ";

        if(typeof table_name==='string'){
            sql+="`"+ table_name+"` ";
        }
       if(typeof  fields ==='object'){
                sql+="(";
           for(var i in fields){
               sql+="`"+i+"`,";
           }

           sql = sql.replace(/,$/g,"");

           sql+=")value(";
           for(var i in fields){
               sql+="'"+fields[i]+"',";
           }
           sql = sql.replace(/,$/g,"");
                sql+=") ";
       }

    conn.query(sql,function(result){

        callback(result);
    })
};




exports.query=function(sql,data,callback){
    conn.query(sql,data,function(result){

        callback(result);
    })
};