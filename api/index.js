const express = require('express');
const Router = express.Router();

Router.use('/users', require('./users'));
Router.use('/topics', require('./topics'));
Router.use('/messages', require('./messages'));

module.exports = Router;