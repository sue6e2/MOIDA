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

router.post('/', function(req, res) {
    res.send('Received a post request');

    let sql='INSERT INTO modiagroup VALUES (null,?,?,?,?,?)';
    let name = req.body.name;
    let max_number = req.body.max_number;
    let master_id = req.body.master_id;
    let discription = req.body.discription;
    let status =req.body.status;
    let params=[name,max_number,master_id,discription, status];

    connection.query(sql,params,(err,rows,fields)=>{
        res.send(rows);
    })
})

router.get('/', function (req, res) {
    connection.query(
        'SELECT * FROM moidagroup',
        (err,rows,fields)=>{
            res.send(rows);
        }
    )
})

module.exports = router;