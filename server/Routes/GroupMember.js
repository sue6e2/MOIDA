const express = require('express');
const router = express.Router();

router.delete('/', function (req, res) {
    //DB생성전이므로 respond만 받도록 함
    res.send('Received a DELETE request');
})

module.exports = router;