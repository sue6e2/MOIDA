const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const groupMember = require('./Routes/GroupMember');
app.use('/groupMember', groupMember);

app.listen(5000, () => console.log('express server is listening on port 5000'));

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

