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

    connection.query(function (err, rows) {
        'SELECT name, discription, status, startdate,enddate, image, badge, rate FROM moidagroup'
        if(!err){
            res.send({code:0, rows});
        }else{
            res.send({code:101, err});
        }
    })
})

module.exports = router;