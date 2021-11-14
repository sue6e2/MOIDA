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

//프론트에서 줘야하는 value : account_id , group_id
router.post('/inviteMember', function (req, res) {

    //가짜데이터(db에 만들어졌음). 프론트에서 현재 세션의 user_id와 group_id를 보내주면 params를 통해 가져와야할듯
    const user_id = req.query.user_id;
    const group_id = req.query.group_id;
    const status = req.query.status;

    connection.query(`insert into moidagroup_member (user_id,group_id,status) values (${user_id},${group_id},${status})`, function (err, rows) {
        if (err) { throw err; }
    })
})

router.get('/', function (req, res) {
    res.send({ test: "this is test for api" });
})

module.exports = router;