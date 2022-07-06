const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    emailVerified: {
        type: Boolean,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    order: {
        type: Array,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    refreshToken: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('users', UserSchema);