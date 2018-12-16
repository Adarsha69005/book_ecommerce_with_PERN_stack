const db = require('../database');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.get('/books', (req, res) => {
        db('bookdetails').select('*').from('bookdetails').then(books => res.json(books))
        .catch(err => res.status(400).json('error fetching books'))
      });

    app.post('/books', (req, res) => {
      var book = req.body;
      db.insert(book).into('bookdetails')
        .returning("*")
        .then(book => res.json(book))
        .catch(err => res.status(400).json('error submitting books'))
    
    });

    app.delete('/books/:id', (req, res) => {
        var id = req.params.id;
        db('bookdetails').where('id', '=', id).del()
        .returning('*')
        .then(res.json('Successfully Deleted'))
        .catch(err => res.status(400).json('error deleting books'))
      });

    app.put('/books/:id', (req, res) => {
      var book = req.body;
      var id = req.params.id;
      db('bookdetails').where('id', '=', id).update(book)
      .returning('*')
      .then(updatebook => res.json(updatebook[0]))
      .catch(err => res.status(400).json('error updating'))
    })

    

};