var User = require('../models/user-model');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/vietsys');

var users = [
    new User({
        username: 'admin',
        password: 'admin'
    }),
    new User({
        username: 'user',
        password: 'user'
    })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        done++;
        if (done === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}