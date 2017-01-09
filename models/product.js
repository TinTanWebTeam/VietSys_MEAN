var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    productType_id: { type: Number, required: true },
    active: { type: Boolean, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

module.exports = mongoose.model('Product', schema);