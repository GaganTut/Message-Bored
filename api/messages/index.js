/*jshint esversion: 6*/
const express = require('express');
const messages = express.Router();
const { Topic, User, Message } = require('../../models');

messages.get('/latest', (req, res) => {
  Message.find({
    order: [
      ['updatedAt', 'DESC']
    ],
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

messages.get('bytopic/:topic_id', (req, res) => {
  Message.findById(req.params.topic_id, {
    include: [
    {
      model: Topic,
      attributes: ['name']
    },
    {
      model: User,
      as: 'Author',
      attributes: ['name']
    }]
  });
});

module.exports = messages;