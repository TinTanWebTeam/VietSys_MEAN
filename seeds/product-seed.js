var Product = require('../models/product-model');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/vietsys');

var products = [
    new Product({
        name: 'Product 1',
        description: 'description of product 1',
        productType_id: 1
    }),
    new Product({
        name: 'Product 2',
        description: 'description of product 2',
        productType_id: 2
    }),
    new Product({
        name: 'Product 3',
        description: 'description of product 3',
        productType_id: 3
    }),
    new Product({
        name: 'Product 4',
        description: 'description of product 4',
        productType_id: 4
    }),
    new Product({
        name: 'Product 5',
        description: 'description of product 5',
        productType_id: 5
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        if (err) {
            console.log(err);
            continue;
        }
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}