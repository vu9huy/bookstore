const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    tagName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('tags', TagSchema)