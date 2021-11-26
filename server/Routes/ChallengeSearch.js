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
    database: conf.database,
    timezone: "Asia/Seoul"
})
connection.connect();

router.get('/', function (req, res) {

    let name = req.query.name;
    console.log(name);
    //let sql = `SELECT name, description, status, image, rate, badge, startDate, endDate FROM moidagroup WHERE name LIKE '%${name}%'`; 이전 쿼리문
    let sql = `SELECT g.name, g.description, g.status, g.image, g.rate, g.badge, g.startDate, g.endDate, ( SELECT COUNT(*)  from moidagroup_member i where i.group_id = g.group_id group by i.group_id) AS 'member_count'
    FROM moidagroup_member m INNER JOIN moidagroup g ON (g.group_id = m.group_id)  WHERE g.status = '0' AND g.name LIKE '%${name}%' AND  current_date() <= g.endDate GROUP BY m.group_id ORDER BY COUNT(m.user_id)`;

    connection.query(sql, name, (err, rows) =>{
        
        if(!err){
            res.send({code:0, rows});         
        }else{
            res.send({code:101, err});
        }
    })
})

module.exports = router;