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
    let sql = `INSERT INTO moidagroup_member values (?,?,?,0,0)`;
    let user_id = req.query.user_id;
    let group_id = req.body.params.group_id;
    let status = req.body.params.status;
    let params = [user_id, group_id, status];

    connection.query(sql, params, function (err, rows, fields) {
        if(!err){
            res.send({code : 0, rows});
        }else{
            res.send({code: 102, errorMessage: err })
        }
    })
})

module.exports = router;