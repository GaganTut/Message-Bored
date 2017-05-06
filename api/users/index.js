/*jshint esversion: 6*/
const express = require('express');
const users = express.Router();
const { User, Topic, Message } = require('../../models');

users.get('/', (req, res) => {
  User.all()
    .then(users => {
      res.json(users);
    });
});

users.post('/', (req, res) => {
  User.create(req.body)
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.send(err);
    });
});

users.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send(err);
    });
});


module.exports = users;