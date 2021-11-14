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

const util=require('util');

router.post('/', function(req, res) {
    console.log(`= = = > req: ${util.inspect(req)}`)

    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    //입력된 id와 동일한 id가 db에 있는지 확인
    
    const sql1='SELECT COUNT(*) AS result from account where account_id = ? '
    data.query(sql1, user_id, user_pw,(err, data1)=>{
        try{
            if(data1[0].result < 1){ //동일 id가 없다면
                res.send({'msg' : '입력하신 ID가 일치하지 않습니다.'})
            }else{ //동일 id 있다면 일치 확인
                const sql2=`SELECT 
                            CASE(COUNT(*) FROM account where account_id = ? AND account_pwd = ?)
                            WHEN '0' THEN NULL
                            ELSE (SELECT account_id FROM account WHERE account_id = ? AND account_pwd = ?)
                            END AS accountId
                            , CASE(SELECT COUNT(*) FROM account WHERE account_id = ? AND account_pwd = ?)
                            WHEN '0' THEN NULL
                            ELSE (SELECT account_pwd FROM account WHERE account_id = ? AND account_pwd = ?)
                            END AS accountPwd`;
                const params=[user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw]
                data.query(sql2, params, (err, data1)=>{
                    if(!err){
                        res.json({message: '로그인을 성공하였습니다!'})
                        res.send(data1[0])
                    }else{ 
                        
                        res.status(406).json({message: err.message})
                        
                        /*
                        err = new Error("입력하신 ID 혹은 비밀번호가 일치하지 않습니다.")
                        err.statusCode = 102;  
                        res.send(`${statusCode}: ${err}`)*/
                        
                        //res.send(err);
                    }
                })
            }
        }catch(err){
            res.send(err)
        }
    })

})


module.exports = router;