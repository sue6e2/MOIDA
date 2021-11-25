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

//const util = require('util');

router.post('/', function (req, res) {

    const user_id = req.body.params.user_id;
    const user_pw = req.body.params.user_pw;

    //입력된 id와 동일한 id가 db에 있는지 확인
    const sql1 = 'SELECT COUNT(*) AS result from account where account_id = ? '

    connection.query(sql1, user_id, (err, data) => {
        try {
            if (data[0].result < 1) { //동일 id가 없다면
                res.send({ code: 101 }) //입력하신 ID가 없습니다.
            } else { //동일 id 있다면 일치 확인
                const sql2 = `SELECT 
                            CASE(SELECT COUNT(*) FROM account where account_id = ? AND account_pwd = ?)
                            WHEN '0' THEN NULL
                            ELSE (SELECT account_id FROM account WHERE account_id = ? AND account_pwd = ?)
                            END AS accountId
                            , CASE(SELECT COUNT(*) FROM account WHERE account_id = ? AND account_pwd = ?)
                            WHEN '0' THEN NULL
                            ELSE (SELECT account_pwd FROM account WHERE account_id = ? AND account_pwd = ?)
                            END AS accountPwd`;
                const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw]


                connection.query(sql2, params, (err, data) => {
                    if (data[0].accountId != null && data[0].accountPwd != null) {
                        sql3 = `SELECT id, account_name from account where account_id = ? AND  account_pwd = ? `
                        const params2 = [data[0].accountId, data[0].accountPwd]

                        connection.query(sql3, params2, (err, data2) => {
                            console.log(data2);
                            res.send({ code: 0, data: data[0], accountRealId: data2[0].id, accountName: data2[0].account_name });
                        })

                    } else {
                        console.log(err);
                        return res.send({ code: 102 });
                    }
                })
            }
        } catch (err) {
            res.send(err)
        }
    })

})


module.exports = router;