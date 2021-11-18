const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({dest: './upload'})

router.use('/image', express.static('./upload'));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect();

router.post('/', upload.single('image'), function(req, res) {
    
    let sql = 'INSERT INTO modiagroup VALUES (null,?,?,?,?,?,?,?,?,null)';
    let name = req.body.params.name;
    let master_id = req.body.params.master_id;
    let discription = req.body.params.discription;
    let status = req.body.params.status;
    let startdate = req.body.params.startdate;
    let endDate = req.body.params.endDate;
    let image = '/image/' + req.file.filename;
    let badge = req.body.params.badge;
    let params=[name, max_number, master_id, discription, status, startdate, endDate, image, badge];

    connection.query(sql, params, (err,rows,fields)=>{
        if(!err){
        res.send({code : 0, rows});
        }else{
            res.send({code: 102, errorMessage: err })
        }
    })
})


module.exports = router;