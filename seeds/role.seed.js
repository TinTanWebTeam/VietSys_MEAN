var Role = require('../models/role.model');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/vietsys');

var roles = [
    new Role({
        name: 'Dashboard',
        description: 'Dashboard'
    }),
    new Role({
        name: 'Product',
        description: 'Product'
    }),
    new Role({
        name: 'ProductType',
        description: 'ProductType'
    })
];

var done = 0;
for (var i = 0; i < roles.length; i++) {
    roles[i].save(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        done++;
        if (done === roles.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}