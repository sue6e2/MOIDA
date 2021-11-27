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

router.get('/', function (req, res) {

    //console.log(req);
    let user_id = req.body.user_realid;

    let sql = `SELECT distinct g.name AS 'group_name', g.startDate, g.endDate, b.name AS 'badge_name' from badge b INNER JOIN moidagroup g ON g.group_id = b.group_id where user_id = ?;`
    let sql2 = `SELECT g.group_id, g.master_id, g.name, g.description, g.status, g.image, g.rate, g.badge, g.startDate, g.endDate, m.rate AS my_rate, ( SELECT COUNT(*) from moidagroup_member i where i.group_id = g.group_id group by i.group_id) AS 'member_count'
    from moidagroup g INNER JOIN moidagroup_member m ON g.group_id = m.group_id where m.user_id = ?;`

    let params = [user_id];
    let params2 = [user_id];

    let q1 = mysql.format(sql, params);
    let q2 = mysql.format(sql2, params2);

    connection.query( q1 + q2 , function (err, rows) {
            if (!err) {
              
                res.send({ code: 0, rows });
            } else {
                
                res.send({ code: 101 });
            }
        });
})



module.exports = router;