const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const blame = require('./Routes/blame.js');
app.use('/blame', blame);

const mypage = require('./Routes/MyPage.js');
app.use('/mypage', mypage);

const challengeSearch = require('./Routes/ChallengeSearch.js');
app.use('/challengeSearch', challengeSearch);

const challengeMain = require('./Routes/ChallengeMain.js');
app.use('/challengeMain', challengeMain);

const myGroupList = require('./Routes/MyGroupList.js');
app.use('/myGroupList', myGroupList);

const makeGroup = require('./Routes/MakeGroup.js');
app.use('/makeGroup', makeGroup);

const groupMember = require('./Routes/GroupMember.js');
app.use('/groupMember', groupMember);

const signUp = require('./Routes/SignUp.js');
app.use('/signUp', signUp);

app.use('/image', express.static('./upload'));
app.use('/photo', express.static('./upload'));

const signIn = require('./Routes/SignIn.js');
app.use('/signIn', signIn);


app.listen(port, () => console.log(`express server is listening on port ${port}`));

/*
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

const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    connectionLimit: 10,
    waitForConnections: true
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
  });

module.exports = pool;

pool.getConnection(function(err, connection){
    if (err) {
        switch (err.code) {
          case "PROTOCOL_CONNECTION_LOST":
            console.error("Database connection was closed.");
            break;
          case "ER_CON_COUNT_ERROR":
            console.error("Database has too many connections.");
            break;
          case "ECONNREFUSED":
            console.error("Database connection was refused.");
            break;
        }
      }
    if(connection) return connection.release();
    })

*/

