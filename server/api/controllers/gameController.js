exports.startgame = function(req, res) {
  var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  var values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
  ];
  var deck = new Array();
  var playerCard = new Array();

  function createDeck() {
    deck = new Array();
    for (var i = 0; i < values.length; i++) {
      for (var x = 0; x < suits.length; x++) {
        var weight = parseInt(values[i]);
        if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
          weight = 10;
        if (values[i] == "A") weight = 11;
        var card = { Value: values[i], Weight: weight };
        deck.push(card);
      }
    }
  }

  function shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * deck.length);
      var location2 = Math.floor(Math.random() * deck.length);
      var tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }

  function createSession() {
    var doc = {
      username: req.body.username,
      deck,
      startAt: new Date(),
      endAt: null,
      winner: null
    };
    db.collection("games").insertOne(doc, function(err, res) {
      if (err) throw err;
    });
    playerCard = deck.splice(0, 2);
  }

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(403).jsonp({ error: "Please enter username" });
    // res.send("Please enter username.");
  } else {
    createDeck();
    shuffle();
    createSession();
    res.send(playerCard);
  }
};

exports.hit = function(req, res) {
  
};
exports.stand = function(req, res) {};
