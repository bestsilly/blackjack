let time = null;

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
  let playerCards = new Array();

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
    playerCards = deck.splice(0, 2);
    computerCards = deck.splice(0, 2);
    let doc = {
      player: req.body.username,
      playerCards,
      computerCards,
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
    timer(req.body.username);
    res.send({ playerCards });
  }
};

exports.hit = function(req, res) {
  function hitMe() {
    db.findOne({ player: req.body.username }).then(doc => {
      if (!doc) {
        throw new Error("No record found.");
      }
      if (doc.winner === null) {
        let gameDeck = doc.deck;
        let holdingCards = doc.playerCards;
        let hitCard = gameDeck.splice(0, 1);
        playerCards = holdingCards.concat(hitCard);

        let currentPoint = playerCards.reduce(
          (acc, obj) => acc + obj.Weight,
          0
        );

        let update = {
          deck: gameDeck,
          playerCards
        };
        updateGame(req.body.username, update);
        timer(req.body.username);
        res.send({ playerCards });
      } else {
        res.send(doc);
      }
    });
  }
  hitMe();
};

exports.stand = function(req, res) {
  endRound(req.body.username, res);
};

function forceLose(player) {
  db.findOne({ player }).then(doc => {
    if (!doc) {
      throw new Error("No record found.");
    }
    let gameData = {
      endAt: new Date(),
      winner: "Computer"
    };
    updateGame(player, gameData);
  });
}

function summaryPoint(holdingCards) {
  return holdingCards.reduce((acc, obj) => acc + obj.Weight, 0);
}

function updateGame(player, data) {
  db.updateOne({ player }, { $set: data }, function(err, result) {
    if (err) throw err;
  });
}

function timer(player) {
  clearTimeout(time);
  time = setTimeout(() => {
    console.log(`${player} Time Up!`);
    forceLose(player);
  }, 10000);
}

function endRound(player, res) {
  db.findOne({ player }).then(doc => {
    if (!doc) {
      throw new Error("No record found.");
    }
    let { playerCards, computerCards } = doc;
    let playerPoints = summaryPoint(playerCards);
    let computerPoints = summaryPoint(computerCards);
    const roundDetail = {
      playerCards,
      computerCards
    };
    if (playerPoints > computerPoints) {
      res.send({
        ...roundDetail,
        winner: player
      });
    } else if (playerPoints < computerPoints) {
      res.send({
        ...roundDetail,
        winner: "Computer"
      });
    } else {
      res.send({
        ...roundDetail,
        winner: "Draw"
      });
    }
  });
}
