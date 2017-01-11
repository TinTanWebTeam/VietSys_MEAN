var UserRole = require('../models/user_role.model');
var User = require('../models/user.model');
var Role = require('../models/role.model');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/vietsys');

var admin = User.findOne({ usrname: "admin" });
var role = Role.findOne({});

var userRoles = [
    new UserRole({
        user_id: admin._id,
        role_id: role._id
    })
];

var done = 0;
for (var i = 0; i < userRoles.length; i++) {
    userRoles[i].save(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        done++;
        if (done === userRoles.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}