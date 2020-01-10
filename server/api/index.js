const express = require("express");
const api = express();

api.get('/', (req, res) => {
  res.send({
    message: 'Hello from the API',
  });
});

module.exports = api