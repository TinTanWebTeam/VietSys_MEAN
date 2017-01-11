var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRoleSchema = new Schema({
    user_id: { type: String, required: true },
    role_id: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('UserRole', userRoleSchema);
