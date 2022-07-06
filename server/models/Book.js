const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    imageUrl: {
        type: String,
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productLink: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookLayout: {
        type: String,
    },
    desc: {
        type: Array,
        required: true
    },
    sale: {
        type: Number,
    },
    publishYear: {
        type: String,
    },
    publisher: {
        type: String,
    },
    qtyOfPage: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    suplier: {
        type: String,
    },
    tag: {
        type: String,
        required: true
    },
    translator: {
        type: String,
    },
    weight: {
        type: String,
    }
})

module.exports = mongoose.model('books', BookSchema)