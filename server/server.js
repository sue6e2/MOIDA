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


