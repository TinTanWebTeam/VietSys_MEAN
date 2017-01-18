/* ROUTE TEST */

var express = require('express');
var router = express.Router();

router.get('/test1', function (req, res) {

    var content = require('./secrets.json');

    // Read Synchrously
    // var fs = require("fs");
    // console.log("\n *START* \n");
    // var content = fs.readFileSync("./secrets.json");
    // console.log("Output Content : \n" + content);
    // console.log("\n *EXIT* \n");
    res.send(content).status(200);

    // fs.readFile('secrets', function(err, data){
    //     if(err){
    //         console.log(err);
    //         res.send(err).status(501);
    //     }
    //     console.log(data);
    //     res.send(data).status(200);
    // });
});

module.exports = router;