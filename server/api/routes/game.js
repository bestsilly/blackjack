const express = require("express");
const router = express.Router();

// Require controller modules.
const game_controller = require("../controllers/gameController");

router.post("/startgame", game_controller.startgame);
router.post("/hit", game_controller.hit);
router.post("/stand", game_controller.stand);

module.exports = router;
