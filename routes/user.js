var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var Role = require('../models/role.model');
var UserRole = require('../models/user_role.model');

var UserMiddleware = require('../middlewares/user.middleware');

router.use(function (req, res, next) {
    if (UserMiddleware.checkMiddleware(req)) {
        return next();
    }
    return res.send().status(501);
});

router.post('/login', function (req, res) {
    var username = req.body['username'];
    var password = req.body['password'];

    User.findOne({ username: username })
        .then(function (user) {
            if (user == null) {
                console.log("Tài khoản không tồn tại!");
                return res.send({ msg: "Tài khoản không tồn tại!" }).status(404);
            }

            if (user.password !== password) {
                console.log("Tài khoản hoặc mật khẩu không đúng!");
                return res.send({ msg: "Tài khoản hoặc mật khẩu không đúng!" }).status(404);
            }

            var array_role = UserRole.find({ user_id: user._id });
            if(array_role.length > 0){
                
            }

            var token = jwt.sign({ _id: user._id, username: user.username }, 'tintansoft');
            return res.send({ token: token }).status(201);
        }, function (err) {
            console.log(err);
            return res.send(err).status(404);
        }).catch(function (ex) {
            console.log(ex);
            return res.send(ex).status(404);
        });
});

router.get('/authenticate', function(req, res){

});

router.post('/check-login', function (req, res) {

});

router.post('/test', function(req, res){
    let token = req.body['token'];
    try {
        var decoded = jwt.verify(token, 'tintansoft');
        // var decoded = jwt.decode(token);
        // var decoded = jwt.decode(token, { complete: true });
        res.send(decoded).status(200);
    } catch (err) {
        res.send(err).status(501);
    }
})

module.exports = router;