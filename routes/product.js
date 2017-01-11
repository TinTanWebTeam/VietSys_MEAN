var express = require('express');
var router = express.Router();
var Product = require('../models/product.model');

var ProductMiddleware = require('../middlewares/product.middleware');

router.use(function (req, res, next) {
    if (ProductMiddleware.checkMiddleware(req)) {
        return next();
    }
    return res.send().status(501);
});

// GET ALL
router.get('/products', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(products).status(200);
        }
    });
});

// GET ONE
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(product).status(200);
        }
    });
});

// DELETE
router.delete('/:id', function (req, res) {
    Product.remove({ _id: req.params.id }, function (err, product) {
        if (err) {
            res.send(err).status(501);
        } else {
            res.send(product).status(201);
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
    Product.findByIdAndUpdate(req.params.id, { $set: new Product(req.body) }, { new: true }, function (err, product) {
        if (err) return handleError(err);
        res.send(product).status(201);
    });

});

module.exports = router;