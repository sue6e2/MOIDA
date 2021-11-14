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

router.post('/', function (req, res) {

  let account_id = req.body.params.account_id;
  let account_pwd = req.body.params.account_pwd;
  let account_name = req.body.params.account_name;
  connection.query('insert into account (account_id,account_pwd,account_name) values ("' + account_id + '","' + account_pwd + '","' + account_name + '")', function (err, rows) {
    if (err) {
      console.log(err);
      return res.send({ code: 101, errorMessage: err });
    }
    else {
      res.send({ code: 0, data: rows });
    }
  })

})

module.exports = router;