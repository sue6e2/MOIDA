const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect();


router.get('/', function (req, res) {
    //후에 moidagroup 정보들을 내가 가입한 그룹들만 보이게 조건 변경
   connection.query("SELECT g.group_id, g.name, g.discription, g.status,m.user_id, m.status, m.favorite from moidagroup g, (account a INNER JOIN moidagroup_member m) where a.id=m.user_id and g.group_id=m.group_id "
    , function(err,rows,fields){
       if(err){
           console.log("데이터 가져오기 실패");
       }else{
           console.log(rows);
           res.send(rows);
       }
   });
})

module.exports = router;
