let UserRole = require('../models/user_role.model');
let User = require('../models/user.model');
let Role = require('../models/role.model');

let mongoose = require('mongoose');

mongoose.connect('localhost:27017/vietsys');

User.findOne({ username: "admin" }).then(function (admin) {
    Role.findOne({ name: "Dashboard" }).then(function (dashboard) {
        Role.findOne({ name: "Product" }).then(function (role1) {
            let userRoles = [
                new UserRole({
                    user_id: admin._id,
                    role_id: dashboard._id
                }),
                new UserRole({
                    user_id: admin._id,
                    role_id: role1._id
                })
            ];

            let done = 0;
            for (let i = 0; i < userRoles.length; i++) {
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
        });
    });
});

User.findOne({ username: "user" }).then(function (admin) {
    Role.findOne({ name: "Dashboard" }).then(function (dashboard) {
        Role.findOne({ name: "ProductType" }).then(function (role1) {
            let userRoles = [
                new UserRole({
                    user_id: admin._id,
                    role_id: dashboard._id
                }),
                new UserRole({
                    user_id: admin._id,
                    role_id: role1._id
                })
            ];

            let done = 0;
            for (let i = 0; i < userRoles.length; i++) {
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
        });
    });
});

function exit() {
    mongoose.disconnect();
}

