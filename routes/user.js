var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('../models/user-model');

var UserMiddleware = require('../middlewares/user-middleware');

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

router.post('/check-login', function (req, res) {

});

module.exports = router;