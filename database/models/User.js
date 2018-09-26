const mongoose = require('mongoose');


const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_at: {
        type: Date,
        default: new Date()
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',UserSchema);