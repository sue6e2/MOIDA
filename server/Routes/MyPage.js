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
    
    let sql = ``
    let user_id = req.query.account_id;
    let params = [user_id];
    connection.query(sql, params, function (err, rows, fields) {
            if (!err) {
              
                res.send({ code: 0, rows });
            } else {
                
                res.send({ code: 101 });
            }
        });
})



module.exports = router;