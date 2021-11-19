const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({ dest: './upload' })

router.use('/image', express.static('./upload'));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect();

router.post('/', upload.single('image'), function (req, res) {
    
    let sql = 'INSERT INTO moidagroup VALUES (null,?,?,?,?,?,?,?,?,0)';
    let name = req.body.name;
    let master_id = req.query.master_id;
    let description = req.body.description;
    let status = req.query.status;
    let startDate = new Date(req.body.startDate);
    let endDate = new Date(req.body.endDate);
    let image =  '/image/' + req.file.filename;
    let badge = req.body.badge;
    let params = [name, master_id, description, status, startDate, endDate, image, badge];
    
    connection.query(sql, params, (err, rows, fields) => {
        if (!err) {
            res.send({ code: 0, rows });
        } else {
            res.send({ code: 102, errorMessage: err })
        }
    })
})


module.exports = router;