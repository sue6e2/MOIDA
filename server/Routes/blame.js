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
    let user_id = parseInt(req.body.params.user_realid);
    let group_id = req.body.params.group_id;
    let blamedUser_id = req.body.params.blamedUser_id;
    
    let params = [cert_id, user_id, cert_id, user_id]; 

    let q1 = mysql.format(sql, params);
    
    connection.query( q1 + sql2, function (err) {
        if (!err) {
            //신고 성공할 때마다 신고당한 아이디 rate update(validation = '0' 인 것만 카운트)
            let sql3 = `update moidagroup g INNER JOIN  moidagroup_member m ON g.group_id = m.group_id set m.rate = (SELECT count(*)/(g.endDate - g.startDate + 1) * 100  from certification where validation = '0' group by group_id2, account_id having group_id2 = ? and account_id = ?) 
            where  m.group_id = ? AND m.user_id = ?;`
            let sql4 = `update moidagroup g INNER JOIN (SELECT group_id, AVG(rate) AS 'Group_rate' FROM moidagroup_member GROUP BY group_id) m ON g.group_id = m.group_id set g.rate = m.Group_rate where g.group_id = ?;`
            let params3 = [group_id, blamedUser_id, group_id, blamedUser_id];
            let params4 = [group_id];

            let q3 = mysql.format(sql3, params3);
            let q4 = mysql.format(sql4, params4);

            connection.query( q3 + q4 , function (err) {
                if(!err){
                    res.send({ code: 0 })
                   
                }else{
                    res.send({ code: 102 })
                }
            })

            //res.send({ code: 0 })
        } else {
            res.send({ code: 101 })
        }
    })
})


module.exports = router;
