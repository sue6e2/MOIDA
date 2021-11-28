const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({ dest: './upload' })

router.use('/photo', express.static('./upload'));

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

//챌린지 메인페이지
router.get('/', function (req, res) {
    let sql = `SELECT g.name, g.description, g.status, g.image, g.rate, g.badge, g.startDate, g.endDate, m.rate, ( SELECT COUNT(*) from moidagroup_member i where i.group_id = g.group_id group by i.group_id) AS 'member_count'
    from moidagroup g INNER JOIN moidagroup_member m ON g.group_id = m.group_id where m.user_id = ? AND m.group_id = ?`
    let user_id = req.body.user_realid;
    let group_id = req.body.group_id;

    let params = [user_id, group_id]

    connection.query(sql, params, function (err, rows) {
        if (!err) {
            res.send({ code: 0, rows })
        } else {
            res.send({ code: 101 })
        }
    })
})

//인증 생성, group_id와 account테이블에 id 받아와야 함 + 개인 달성률 갱신
router.post('/certification', upload.single('photo'), function (req, res) {
    let sql = `INSERT into certification values (null,?,?,?,?,?,?,'0')`;
    let group_id = req.body.group_id;
    let account_id = req.body.user_realid;
    let title = req.body.title;
    let description = req.body.description;
    let photo;
    if (typeof req.file === "undefined") {
        photo = '/photo/certification_default.png';
    } else {
        photo = '/photo/' + req.file.filename;
    }

    let date = new Date(req.body.date);

    let params = [group_id, account_id, title, description, photo, date];

    //인증하면 개인 및 단체 달성률 갱신
    connection.query(sql, params, function (err) {

        if (!err) {
            let sql3 = `update moidagroup g INNER JOIN  moidagroup_member m ON g.group_id = m.group_id set m.rate = (SELECT count(*)/ (Datediff(g.endDate, g.startDate) + 1) * 100  from certification where validation = '0' group by group_id2, account_id having group_id2 = ? and account_id = ?) 
                        where  m.group_id = ? AND m.user_id = ?;`;
            let params3 = [group_id, account_id, group_id, account_id];
            let q1 = mysql.format(sql3, params3);

            let sql2 = `UPDATE moidagroup g INNER JOIN (SELECT group_id, AVG(rate) AS 'Group_rate' FROM moidagroup_member GROUP BY group_id) m ON g.group_id = m.group_id set g.rate = m.Group_rate where g.group_id = ?;`;
            let params2 = [group_id];
            let q2 = mysql.format(sql2, params2);


            connection.query(q1 + q2, function (err) {
                if (!err) {
                    res.send({ code: 0 })
                } else {
                    res.send({ code: 101, errorMessage: err })
                }
            })
            //res.send({code: 0})
        } else {
            res.send({ code: 101 })
        }

    })
})

/*
//인증하면 개인 및 단체 달성률 갱신
router.put('/updateRate', function (req, res) {

    let group_id = req.body.group_id;
    let account_id = req.body.user_realid;

    let sql = `UPDATE moidagroup g INNER JOIN moidagroup_member m ON g.group_id = m.group_id set m.rate = m.rate + 1/ (g.endDate - g.startDate + 1) *100 where m.user_id = ? AND m.group_id = ?; `; 
    let params = [account_id, group_id];  
    let q1 = mysql.format(sql, params);
    
    let sql2 = `UPDATE moidagroup g INNER JOIN (SELECT group_id, AVG(rate) AS 'Group_rate' FROM moidagroup_member GROUP BY group_id) m ON g.group_id = m.group_id set g.rate = m.Group_rate where g.group_id = ?;`;
    let params2 = [group_id];
    let q2 = mysql.format(sql2, params2);


    connection.query(q1 + q2, function (err) {
        if(!err){
            res.send({code: 0})
        }else{
            res.send({code:101, errorMessage: err})
        }
    })

})
*/

//내 인증목록
router.get('/mine', function (req, res) {
    //최신순 정렬
    let sql = `select c_id, title, description, photo, date, validation, (select count(c_id) from blame RIGHT OUTER JOIN certification on cert_id = c_id where c.c_id = cert_id) AS 'blame_count' from certification c where group_id2 = ? AND account_id = ? order by date desc;`
    let group_id = req.query.group_id;
    let account_id = req.query.user_realid;

    let params = [group_id, account_id];

    connection.query(sql, params, function (err, rows) {

        if (!err) {
            res.send({ code: 0, rows })
        } else {
            res.send({ code: 101 })
        }
    })
})

//다른사람 인증내역 보러가기
router.get('/others', function (req, res) {

    //최신순 정렬
    let sql = `SELECT c.c_id, a.id, a.account_name, c.title, c.description, c.photo, c.date, c.validation from certification c INNER JOIN account a ON a.id = c.account_id where c.group_id2 = ? order by c.date desc`
    let group_id = req.query.group_id;
    let params = [group_id];

    connection.query(sql, params, function (err, rows) {
        if (!err) {
            res.send({ code: 0, rows })
        } else {
            res.send({ code: 101 })
        }
    })
})



module.exports = router;
