const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const gameRoute = require("./api/routes/game");
// const api = require("./api");

const PORT = 5000;
const app = express();

MongoClient.connect("mongodb://blackjack_db:27017/blackjack", function(
  err,
  client
) {
  if (err) throw err;

  global.db = client.db("blackjack");
  // create game collection in database
  db.createCollection("games", function(err, result) {
    if (err) throw err;
  });
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use("/api", gameRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
