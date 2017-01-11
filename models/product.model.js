var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name:           { type: String, required:  true },
    description:    { type: String },
    productType_id: { type: Number, required:  true },
    active:         { type: Boolean, required: true, default: true },
    created_at:     { type: Date, required:    true, default: Date.now },
    updated_at:     { type: Date, required:    true, default:  Date.now }
});

module.exports = mongoose.model('Product', productSchema);