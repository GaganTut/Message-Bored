/*jshint esversion: 6*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const db = require('./models');

db.sequelize.sync({force:true});

app.use(express.static('./public'));
app.use(bodyParser.json());

app.use('/api', require('./api'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});