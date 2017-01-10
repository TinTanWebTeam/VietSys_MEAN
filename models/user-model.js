var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:   { type: String, required:  true },
    password:   { type: String, required:  true },
    active:     { type: Boolean, required: true, default: true },
    created_at: { type: Date, required:    true, default: Date.now },
    updated_at: { type: Date, required:    true, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
