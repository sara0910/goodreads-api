const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book = require('./../models/Book');

router.get('/', function(req, res, next) {
    Book.find().exec()
    .then(books => res.status(200).json({ message: 'book list fecthed', data: books }))
    .catch(err => res.status(500).json({ message: err.message, err}));
});

router.post('/', function(req, res, next) {
    const { name = '', 
        authorId = null, 
        publishDate = null,
        rating = 0, 
        image = null,
        description = '' 
    } = req.body;
    const newBook = new Book({ 
        _id: new mongoose.Types.ObjectId,
        name,
        authorId,
        publishDate,
        rating,
        image,
        description
    });
    newBook.save()
    .then(book => res.status(201).json(book))
    .catch(err => res.status(500).json({ message: err.message, err}));
});

router.get('/:id', function(req, res, next) {
    const { id } = req.params;
    (id) ? 
        Book.findById(id).exec()
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json({ message: err.message, err})) 
    : res.status(400).json({ message: 'Id is Undefined'});
});

router.patch('/:id', function(req, res, next) {
    const { id } = req.params;
    Book.update({ _id: id}, { $set: req.body}).exec()
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json({ message: err.message, err}))
});

router.delete('/:id', function(req, res, next) {
    const { id } = req.params;
    Book.deleteOne({ _id: id}).exec()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

module.exports = router;