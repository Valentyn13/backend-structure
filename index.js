const express = require("express");

const db = require('./src/data/connection')
const initApi = require('./src/api/api')
const statEmitter = require('./src/socket/connection')

const app = express();

const port = 4000;

const stats = {
  totalUsers: 3,
  totalBets: 1,
  totalEvents: 1,
};
app.use(express.json());

app.use((_uselessRequest, _uselessResponse, neededNext) => {
  db.raw('select 1+1 as result').then(function () {
    neededNext();
  }).catch(() => {
    throw new Error('No db connection');
  });
});

app.use(initApi(express.Router))

const server = app.listen(port, () => {
  statEmitter.on('newUser', () => {
    stats.totalUsers++;
  });
  statEmitter.on('newBet', () => {
    stats.totalBets++;
  });
  statEmitter.on('newEvent', () => {
    stats.totalEvents++;
  });

  console.log(`App listening at http://localhost:${port}`);
});

// Do not change this line
module.exports = { app, server };
