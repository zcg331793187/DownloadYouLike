/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import  {mysqlBase} from './mysqlBase';
import * as Promise from 'bluebird';


// console.log(mysqlBase);


export default  class mysql extends mysqlBase {

    constructor() {

        super();

    }

    checkDataAndInsert(herfs: string[]) {

        herfs.forEach((item,index)=>{

            this.find('select id from node_url where url=?', [item]).spread((response: any) => {



                if (!response) {


                        this.insert('node_url', {url: item}).then((response) => {


                    });

                }




            });


        });




    }


}


/*
 db.select('select * from node_title').spread((response:any)=>{

 console.log(response);

 }).catch((response)=>{
 console.log(response);
 });
 */

/*
 db.insert('node_sort',{namev:'123123'}).spread((response)=>{
 console.log(response);
 });
 */

/*
 db.update('node_sort',{namev:123,text:'123123123',www:'12312321'},'1=1').spread((response)=>{

 console.log(response);

 }).catch((error)=>{
 console.log('error:',error);
 });
 */