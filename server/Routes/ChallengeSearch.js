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

    let name = req.query.name;
    console.log(name);

    let sql = `SELECT name FROM moidagroup WHERE name LIKE '%${name}%'`;

    connection.query(sql, name, (err, rows, result) =>{
        
        if(!err){
            res.send({code:0, rows});
            console.log("에러x");
            console.log(rows);
        }else{
            res.send({code:101, err});
            console.log("에러");
        }
    })
})

module.exports = router;