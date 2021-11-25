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

//신고기능
router.post('/', function (req, res) {
    console.log(req.body.params);
    let sql = `INSERT into blame select null, ?, ? from DUAL where not exists(SELECT * FROM blame WHERE cert_id = ? AND user_id2 = ?)`
    let cert_id = req.body.params.cert_id;
    let user_id = req.body.params.user_realid;
    let params = [cert_id, user_id, cert_id, user_id]

    connection.query(sql, params, function (err) {
        if (!err) {
            res.send({ code: 0 })
        } else {
            res.send({ code: 101 })
        }
    })
})


module.exports = router;
