/*jshint esversion : 6*/
const express = require('express');
const topics = express.Router();
const { Topic, User, Message } = require('../../models');

topics.route('/')
  .get((req, res) => {
    Topic.all({
      include: [{
        model: User,
        as: 'Creator',
        attributes: ['name']
      }]
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send(err);
    });
  })
  .post((req, res) => {
    Topic.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  });

topics.put('/:name', (req, res) => {
  Topic.update({
    where: {
      name: req.params.name
    }
  });
});



module.exports = topics;