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

//챌린지 신청
router.post('/inviteMember', function (req, res) {
    console.log(req);
    let sql = `INSERT INTO moidagroup_member values (?,?,0)`;
    let user_id = req.body.params.master_realid;
    let group_id = req.body.params.group_id;
    let params = [user_id, group_id];

    connection.query(sql, params, function (err, rows, fields) {
        if (!err) {
            res.send({ code: 0, rows });
        } else {
            res.send({ code: 102, errorMessage: err })
        }
    })
})

//챌린지 탈퇴
router.delete('/leave/:group_id',function(req,res) {
    let sql = `DELETE from moidagroup_member where group_id = ? AND user_id = ?`
    let group_id = req.body.params.group_id;
    let user_id = req.body.params.user_id;
    let params = [group_id, user_id]
    
    connection.query(sql, params, (err, data)=>{
        if(!err){
            res.send({code: 0})
        }else{
            res.send({code:101, errorMessage: err})
        }
    })
})

module.exports = router;