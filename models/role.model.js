var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Role', roleSchema);

