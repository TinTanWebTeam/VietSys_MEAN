/* ROUTE TEST */

var express = require('express');
var router = express.Router();
let colors = require('colors');

router.get('/test1', function (req, res) {
    console.log("Hello World".bgGreen);
    res.send("aaa").status(200);
});

module.exports = router;