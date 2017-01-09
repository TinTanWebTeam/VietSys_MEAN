var express = require('express');
var router = express.Router();
var Product = require('../models/product');

// GET ALL
router.get('/products', function (req, res) {
    Product.find({}, function (err, resources) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(resources).status(200);
        }
    });
});

// GET ONE
router.get('/:id', function (req, res) {
    var id = req.params.id;
    Product.findById(id, function (err, resource) {
        if (err) {
            res.send(err);
        } else {
            var product = resource;
            res.send(resource);
        }
    });
});

// DELETE
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Product.remove({ _id: id }, function (err, resource) {
        if (err) {
            res.send(err);
        } else {
            res.send(resource);
        }
    });
});

// ADD
router.post('/', function (req, res) {
    var product = new Product(req.body);
    product.save(function (err, resource) {
        if (err) {
            res.send(err).status(501);
        } else {
            res.json(resource).status(201);
        }
    });
});

// UPDATE
router.put('/:id', function (req, res, next) {
    var product = new Prodct(req.body);

});

module.exports = router;