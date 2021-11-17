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
    const user_id = req.body.params.account_id;
    //후에 moidagroup 정보들을 내가 가입한 그룹들만 보이게 조건 변경
   connection.query(`SELECT g.name, g.discription, g.status, g.image, g.rate, m.status, m.favorite, m.rate from moidagroup g, (account a INNER JOIN moidagroup_member m) where ${user_id} = m.user_id AND g.group_id = m.group_id `
    , function(err,rows,fields){
       if(!err){
        console.log(rows);
        res.send(rows);   
       }else{
        console.log(err);
        res.send({code: 101});
       }
   });
})

router.get('/popularity', function(req,res){
    connection.query(`SELECT g.name, g.discription, g.status g.image, g.rate FROM moidagroup_member m INNER JOIN moidagroup g 
                  GROUP BY m.group_id HAVING COUNT(m.user_id) > 0 ORDER BY COUNT(m.user_id) DESC LIMIT 5`)
                  ,function(err,rows,fields) {
                      if(!err){
                          res.send({code: 0, rows})
                      }else{
                          res.send({code: 101})
                      }
                  }
   
})

module.exports = router;
