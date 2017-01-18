const jwt = require('jsonwebtoken');
const Role = require('../models/role.model');
const UserRole = require('../models/user_role.model');
const NODE_ENV = require('../utilities/NODE_ENV.json');

let middelware = {

    checkMiddleware: (req, res, next, roleName) => {
        let token = req.headers['authorization'].substr(7, req.headers['authorization'].length);
        let decoded = jwt.verify(token, NODE_ENV['secretOrPublicKey']);
        let user_id = decoded['_id'];

        UserRole.find({ user_id: user_id }).then(function (array_role_user) {
            console.log("ARRAY_ROLE_USERRRRRRRRRRRRRRRRRRRr");
            console.log(array_role_user);
            if (array_role_user == null) {
                return res.send({ msg: "!" }).status(404);
            }

            if (array_role_user.length <= 0) {
                return res.send({ msg: "!" }).status(404);
            }

            Role.findOne({ name: roleName }).then((role) => {
                if (role == null) {
                    res.send("NULL").status(501);
                }
                for (let i = 0; i < array_role_user.length; i++) {
                    if (role._id == array_role_user[i]['role_id']) {
                        return next();
                    }
                }
                res.send("NULL").status(501);
            }).catch(function (err) {
                console.log(err);
                res.send("NULL").status(501);
            });
        }, function (err) {
            console.log(err);
            return res.send(err).status(404);
        });
    }
}

module.exports = middelware;