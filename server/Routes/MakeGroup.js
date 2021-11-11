const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    res.send('Received a post request');

    let sql='INSERT INTO modiagroup VALUES (null,?,?,?,?,?)';
    let name = req.body.name;
    let max_number = req.body.max_number;
    let master_id = req.body.master_id;
    let discription = req.body.discription;
    let status =req.body.status;
    let params=[name,max_number,master_id,discription, status];

    connection.query(sql,params,(err,rows,fields)=>{
        res.send(rows);
    })
})

module.exports = router;