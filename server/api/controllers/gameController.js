exports.startgame = function(req, res) {
  let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  let values = [
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
  let deck = new Array();
  let playerCard = new Array();

  function createDeck() {
    deck = new Array();
    for (let i = 0; i < values.length; i++) {
      for (let x = 0; x < suits.length; x++) {
        let weight = parseInt(values[i]);
        if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
          weight = 10;
        if (values[i] == "A") weight = 11;
        let card = { Value: values[i], Weight: weight };
        deck.push(card);
      }
    }
  }

  function shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * deck.length);
      let location2 = Math.floor(Math.random() * deck.length);
      let tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }

  function dealHand() {
    playerCard = deck.splice(0, 2);
    computerCard = deck.splice(0, 2);
    let doc = {
      player: req.body.username,
      playerCard,
      computerCard,
      deck,
      startAt: new Date(),
      endAt: null,
      winner: null
    };
    db.insertOne(doc, function(err, res) {
      if (err) throw err;
    });
  }

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(403).jsonp({ error: "Please enter username" });
    // res.send("Please enter username.");
  } else {
    createDeck();
    shuffle();
    dealHand();
    res.send(playerCard);
  }
};

exports.hit = function(req, res) {
  async function updateGame(data) {
    result = await db.updateOne(
      { player: req.body.username },
      { $set: data },
      function(err, result) {
        if (err) throw err;
      }
    );
  }

  async function hitMe() {
    result = await db
      .find({}, { player: req.body.username })
      .toArray(function(error, result) {
        if (error) throw error;
        let gameDeck = result[0].deck;
        let holdingCards = result[0].playerCard;
        let hitCard = gameDeck.splice(0, 1);
        playerCard = holdingCards.concat(hitCard);

        let currentPoint = playerCard.reduce((acc, obj) => acc + obj.Weight, 0);

        let update = {
          deck: gameDeck,
          playerCard
        };
        updateGame(update);
        check(currentPoint,playerCard);
        res.send(playerCard);
      });
  }

  function check(point, card) {
    if (point > 21) {
      res.send({
        status: "lose",
        card
      });
    }
  }
  hitMe();
};

exports.stand = function(req, res) {};
