import axios from "axios";
export const GAME = {
    START_GAME_BEGIN: "START_GAME_BEGIN",
    START_GAME_SUCCESS: "START_GAME_SUCCESS",
    START_GAME_FAILED: "START_GAME_FAILED",
    HIT_ME_BEGIN: "HIT_ME_BEGIN",
    HIT_ME_SUCCESS: "HIT_ME_SUCCESS",
    HIT_ME_FAILED: "HIT_ME_FAILED"
};

export const startGame = (username, ownProps) => {
  return dispatch => {
    dispatch(startGameBegin());
    axios
      .post("http://localhost:5051/api/startgame", { username })
      .then(res => {
        console.log(res.data);
        dispatch(startGameSuccess(res.data, username, ownProps));
      })
      .catch(err => {
        console.log(err);
        dispatch(startGameFailed(err));
      });
  };
};

const startGameBegin = () => ({
  type: GAME.START_GAME_BEGIN
});

const startGameSuccess = (playerCard, username, ownProps) => {
  ownProps.history.push("/blackjack");
  return {
    type: GAME.START_GAME_SUCCESS,
    playerCard,
    username
  };
};

const startGameFailed = error => ({
  type: GAME.START_GAME_FAILED,
  error
});
