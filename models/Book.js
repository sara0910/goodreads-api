const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    _id:  ObjectId,
    name: String,
    autorId:  ObjectId,
    publishDate: Date,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    image: String,
    description: String
});

module.exports = mongoose.model('Book', bookSchema);