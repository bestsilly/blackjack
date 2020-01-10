const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const gameRoute = require("./api/routes/game");

const PORT = 5000;
const app = express();

MongoClient.connect("mongodb://blackjack_db:27017/blackjack", function(
  err,
  client
) {
  if (err) throw err;

  dbo = client.db("blackjack");
  // create game collection in database
  dbo.createCollection("games", function(err, result) {
    if (err) throw err;
  });
  global.db = dbo.collection("games");
});
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", gameRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
