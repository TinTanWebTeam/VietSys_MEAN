/* ROUTE TEST */

var express = require('express');
var router = express.Router();

router.get('/test1', function (req, res) {
    res.send("test1").status(200);
});

module.exports = router;