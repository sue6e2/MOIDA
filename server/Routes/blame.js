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
    multipleStatements: true,
    timezone: "Asia/Seoul"
})
connection.connect();

//신고기능
router.post('/', function (req, res) {
    
    let sql = `INSERT into blame select null, ?, ? from DUAL where not exists(SELECT * FROM blame WHERE cert_id = ? AND user_id2 = ?);`
    let sql2 = `update certification set validation = '1' where c_id IN (SELECT cert_id from blame group by(cert_id) having count(cert_id)>=5 );`
    let cert_id = req.body.params.cert_id;
    let user_id = req.body.params.user_realid;
    let params = [cert_id, user_id, cert_id, user_id]
    let q1 = mysql.format(sql, params);
    
    connection.query( q1 + sql2, function (err) {
        if (!err) {
            res.send({ code: 0 })
        } else {
            res.send({ code: 101 })
        }
    })
})


module.exports = router;
