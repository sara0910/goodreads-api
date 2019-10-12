const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Author = require('../models/Author');

router.get('/', function(req, res, next) {
    Author.find().exec()
    .then(author => res.status(200).json({ message: 'Author fetched', data: author }))
    .catch(err => res.status(500).send({ message: err}))
});

router.post('/', function(req, res, next) {
    const { 
        fullname = '',
        image = '',
        nationality = '',
        DOB = ''
    } = req.body;
    const newAuthor = new Author({
        _id: new mongoose.Types.ObjectId,
        fullname,
        image,
        nationality,
        DOB
    });
    newAuthor.save()
    .then(author => res.status(201).json(author))
    .then(err => res.status(500).json({ message: err.message, err}))
});

router.patch('/:id', function(req, res, next) {
    const { id } = req.params;
    Author.update({ _id: id}, { $set: req.body }).exec()
    .then(author => res.status(200).json(author))
    .catch(err => res.status(500).json({ message: err}));
});

router.get('/:id', function(req, res, next) {
    const { id } = req.params;
    Author.findById(id).exec()
    .then(author => res.status(200).json(author))
    .catch(err => res.status(500).json({ message: err}))
});

router.delete('/:id', function(req, res, next) {
    const { id } = req.params;
    Author.deleteOne({ _id: id }).exec()
    .then(result => res.json(result))
    .catch(err => res.status(200).json({ message: err }))
});

module.exports = router;
