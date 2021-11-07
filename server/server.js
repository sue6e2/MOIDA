const express = require('express');
const app = express();

const groupMember = require('./Routes/GroupMember');
app.use('/groupMember', groupMember);

app.listen(5000, () => console.log('express server is listening on port 5000'));