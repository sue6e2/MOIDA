const fs = require('fs');
const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port=process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const makeGroup = require('./Routes/MakeGroup.js');
app.use('/makeGroup', makeGroup);

const groupMember = require('./Routes/GroupMember.js');
app.use('/groupMember', groupMember);


app.listen(port, () => console.log('express server is listening on port 5000'));

const data=fs.readFileSync('../database/database.json');
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

