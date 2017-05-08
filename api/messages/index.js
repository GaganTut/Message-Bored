/*jshint esversion: 6*/
const express = require('express');
const messages = express.Router();
const { Topic, User, Message } = require('../../models');

messages.get('/latest', (req, res) => {
  Message.all({
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

messages.get('/bytopic/:topic_id', (req, res) => {
  Message.all({
    order: [
        ['updatedAt', 'DESC']
      ],
      include: [
        {
          model: User,
          as: 'Author',
          attributes: ['name']
        },
        {
          model: Topic,
          include: {
            model: User,
            as: 'Creator',
            attributes: ['name']
          }
        }
      ],
      where: {
        topic_id: req.params.topic_id
      }
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = messages;