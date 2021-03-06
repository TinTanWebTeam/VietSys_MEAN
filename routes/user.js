let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const colors = require('colors');
const NODE_ENV = require('../utilities/NODE_ENV.json');

let User = require('../models/user.model');
let Role = require('../models/role.model');
let UserRole = require('../models/user_role.model');
let Middleware = require('../middlewares/middleware');

router.post('/login', function (req, res) {
    var username = req.body['username'];
    var password = req.body['password'];

    // var myQuery = User.find({ username: username })
    //     .select('_id username created_at updated_at');
    
    // myQuery.exec(function(err, user){
        
    // });

    User.findOne({ username: username }).then(function (user) {
        console.log("USERRRRRRRRRRRRRRRRRRRRRRRRR");
        console.log(user);
        if (user == null) {
            console.log("Tài khoản không tồn tại!");
            return res.send({ msg: "Tài khoản không tồn tại!" }).status(404);
        }

        if (user.password !== password) {
            console.log("Tài khoản hoặc mật khẩu không đúng!");
            return res.send({ msg: "Tài khoản hoặc mật khẩu không đúng!" }).status(404);
        }

        var token = jwt.sign(
            { _id: user._id, username: user.username, created_at: user.created_at, updated_at: user.updated_at }
            , NODE_ENV['secretOrPrivateKey']
            , { expiresIn: '1h' }
        );
        console.log("TOKENNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
        console.log(token);
        return res.send({ token: token }).status(201);
    }, function (err) {
        console.log(err);
        return res.send(err).status(404);
    }).catch(function (ex) {
        console.log(ex);
        return res.send(ex).status(404);
    });
});

router.get('/authentication', function (req, res) {
    var array_role = [];
    let token = req.headers['authorization'].substr(7, req.headers['authorization'].length);
    console.log("TOKENNNNNNNNNNNNNNNNNNN");
    console.log(token);
    try {
        var decoded = jwt.verify(token, NODE_ENV['secretOrPublicKey']);
        console.log("DECODEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        console.log(decoded);

        UserRole.find({ user_id: decoded['_id'] }).then(function (array_role_user) {
            console.log("ARRAY_ROLE_USERRRRRRRRRRRRRRRRRRRr");
            console.log(array_role_user);
            if (array_role_user == null) {
                return res.send({ msg: "!" }).status(404);
            }

            if (array_role_user.length <= 0) {
                return res.send({ msg: "!" }).status(404);
            }

            var done = 0;
            for (var i = 0; i < array_role_user.length; i++) {
                Role.findOne({ _id: array_role_user[i]['role_id'] }).then(function (role) {
                    console.log("ROLEEEEEEEEEEEEEEEEEEEEEee");
                    console.log(role);
                    if (role == null) {
                        console.log("Role không tồn tại!");
                        return res.send({ msg: "Role không tồn tại!" }).status(404);
                    }
                    array_role.push(role);
                    
                    done++;
                    if (done == array_role_user.length) {
                        console.log("ARRAY_ROLEEEEEEEEEEEEEEEEEEEEEEE");
                        console.log(array_role);
                        decoded.role = array_role;

                        console.log("FINALLLLLLLLLLLLLLLLLLLLLlll");
                        console.log(decoded);

                        res.send(decoded).status(200);
                    }
                }, function (err) {
                    console.log(err);
                    return res.send(err).status(404);
                });
            }
        }, function (err) {
            console.log(err);
            return res.send(err).status(404);
        });
    } catch (err) {
        res.send(err).status(501);
    }
});

router.use(function (req, res, next) {
    Middleware.checkMiddleware(req, res, next, 'User');
});

module.exports = router;