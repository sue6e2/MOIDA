const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const myTodo = require('./Routes/MyTodo.js');
app.use('/myTodo', myTodo);

const myGroupList = require('./Routes/MyGroupList.js');
app.use('/myGroupList', myGroupList);

const makeGroup = require('./Routes/MakeGroup.js');
app.use('/makeGroup', makeGroup);

const groupMember = require('./Routes/GroupMember.js');
app.use('/groupMember', groupMember);

const signUp = require('./Routes/SignUp.js');
app.use('/signUp', signUp);

app.listen(port, () => console.log('express server is listening on port 5001'));

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
