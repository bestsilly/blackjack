import axios from "axios"
export const GAME = {
  START_GAME_BEGIN: "START_GAME_BEGIN",
  START_GAME_SUCCESS: "START_GAME_SUCCESS",
  START_GAME_FAILED: "START_GAME_FAILED"
};

export const startGame = username => {
  return dispatch => {
    dispatch(startGameBegin());
    axios
      .post("http://localhost:5051/api/startgame", { username })
      .then(res => {
        console.log(res.data);
        dispatch(startGameSuccess(res.data));
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
const startGameSuccess = payload => ({
  type: GAME.START_GAME_SUCCESS,
  payload
});
const startGameFailed = error => ({
  type: GAME.START_GAME_FAILED,
  error
});
