const mysql=require('mysql')

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'jwt',
    port:3306
})
connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Database connected')
    }
    })
 
module.exports=connection