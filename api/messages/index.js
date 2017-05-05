/*jshint esversion: 6*/
const express = require('express');
const messages = express.Router();
const { Topic, User, Message } = require('../../models');

messages.get('/latest', (req, res) => {
  Message.find({
    limit: 10,
    include: [
      {
        model: User,
        as: 'Author',
        attributes: ['name']
      },
      {
        model: Topic,
        attributes: ['name']
      }
    ]
  })
  .then(data => {
    res.json(data);
  });
});

messages.post('/', (req, res) => {
  Message.create(req.body)
    .then(data => {
    res.json(data);
  });
});

messages.get('by-topic/:topic_id', (req, res) => {
  Message.all({
    where: {
      topic_id: req.params.topic_id
    },
    include: [User, Topic]
  });
});

module.exports = messages;