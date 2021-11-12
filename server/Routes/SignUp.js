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

router.get('/', function(req, res) {
  res.send({ test: "this is test for api" });

    // let sql='INSERT INTO account VALUES (null,?,?,?,?,?)';
    // let id = req.body.id;
    // let password = req.body.max_number;
    // let name = req.body.master_id;
    // let params=[id,password,name];

    // connection.query(sql,params,(err,rows,fields)=>{
    //     res.send(rows);
    // })
})

module.exports = router;