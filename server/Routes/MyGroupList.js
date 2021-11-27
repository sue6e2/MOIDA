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

    const user_id = req.query.account_id;

    connection.query(`SELECT g.group_id, g.master_id, g.name, g.description, g.status, g.image, g.rate, g.badge, g.startDate, g.endDate, m.rate AS my_rate, ( SELECT COUNT(*) from moidagroup_member i where i.group_id = g.group_id group by i.group_id) AS 'member_count'
                     from moidagroup g INNER JOIN moidagroup_member m ON g.group_id = m.group_id where m.user_id = ${user_id} AND current_date() <= g.endDate;`
        , function (err, rows) {
            if (!err) {
                res.send({ code: 0, rows });
            } else {
                console.log(err);
                res.send({ code: 101 });
            }
        });
})

//public, startDate지난건 안보여줌
router.get('/popularity', function (req, res) {
    connection.query(`SELECT g.group_id, g.name, g.description, g.status, g.image, g.rate, g.badge, g.startDate, g.endDate, ( SELECT COUNT(*)  from moidagroup_member i where i.group_id = g.group_id group by i.group_id) AS 'member_count'
                      FROM moidagroup_member m INNER JOIN moidagroup g ON (g.group_id = m.group_id)  WHERE g.status = '0' AND current_date() <= g.startDate GROUP BY m.group_id ORDER BY COUNT(m.user_id) DESC LIMIT 8`
        , function (err, rows) {
            if (!err) {
                res.send({ code: 0, rows })
            } else {
                res.send({ code: 101 })
            }
        })
})

module.exports = router;
