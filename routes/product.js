let express = require('express');
let router = express.Router();
let Product = require('../models/product.model');

let Middleware = require('../middlewares/middleware');
let colors = require('colors');

router.use(function (req, res, next) {
    Middleware.checkMiddleware(req, res, next, 'Product');
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
    let product = new Product(req.body);
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
    console.log("Hello".red);
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, { $set: new Product(req.body) }, { new: true }, function (err, product) {
        if (err) return handleError(err);
        res.send(product).status(201);
    });

});

module.exports = router;