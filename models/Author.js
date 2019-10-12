const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const authorSchema = new mongoose.Schema({
    _id:  ObjectId,
    fullname: String,
    image: String,
    nationality: String,
    DOB: Date
});

module.exports = mongoose.model('Author', authorSchema);