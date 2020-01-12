import axios from "axios";
export const GAME = {
  START_GAME_BEGIN: "START_GAME_BEGIN",
  START_GAME_SUCCESS: "START_GAME_SUCCESS",
  START_GAME_FAILED: "START_GAME_FAILED",
  HIT_ME_BEGIN: "HIT_ME_BEGIN",
  HIT_ME_SUCCESS: "HIT_ME_SUCCESS",
  HIT_ME_FAILED: "HIT_ME_FAILED",
  STAND_BEGIN: "STAND_BEGIN",
  STAND_SUCCESS: "STAND_SUCCESS",
  STAND_FAILED: "STAND_FAILED",
  REINIT_TIMER: "REINIT_TIMER",
  TIMER_START: "TIMER_START",
  TIMER_STOP: "TIMER_STOP",
  CLEAR_STATE: "CLEAR_STATE",
  TICK: "TICK",
  EXIT: "EXIT"
};

let timer = null;

export const startGame = (username, ownProps) => {
  return dispatch => {
    dispatch(startGameBegin());
    axios
      .post("http://localhost:5051/api/startgame", { username })
      .then(res => {
        console.log(res.data);
        dispatch(startGameSuccess(res.data.playerCards, username));
        dispatch(timerStart());
        ownProps.history.push("/blackjack");
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

const startGameSuccess = (playerCards, username, ownProps) => {
  return {
    type: GAME.START_GAME_SUCCESS,
    playerCards,
    username
  };
};

const startGameFailed = error => ({
  type: GAME.START_GAME_FAILED,
  error
});

export const hitMe = username => {
  return dispatch => {
    dispatch(hitMeBegin());
    axios
      .post("http://localhost:5051/api/hit", { username })
      .then(res => {
        console.log(res);
        const playerPoint = res.data.playerCards.reduce(
          (acc, obj) => acc + obj.Weight,
          0
        );
        console.log(playerPoint);
        dispatch(hitMeSuccess(res.data));
        dispatch(reinitTimer());
        if (playerPoint > 21) {
          console.log(playerPoint + "asd");
          dispatch(reinitTimer());
          clearInterval(timer);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(hitMeFailed(err));
      });
  };
};

const hitMeBegin = () => ({
  type: GAME.HIT_ME_BEGIN
});
const hitMeSuccess = payload => ({
  type: GAME.HIT_ME_SUCCESS,
  payload
});
const hitMeFailed = error => ({
  type: GAME.HIT_ME_FAILED,
  error
});

export const stand = username => {
  return dispatch => {
    dispatch(standBegin());
    axios
      .post("http://localhost:5051/api/stand", { username })
      .then(res => {
        console.log(res);
        clearInterval(timer);
        dispatch(standSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(standFailed(err));
      });
  };
};

const standBegin = () => ({
  type: GAME.STAND_BEGIN
});
const standSuccess = payload => ({
  type: GAME.STAND_SUCCESS,
  payload
});
const standFailed = error => ({
  type: GAME.STAND_FAILED,
  error
});

export const reinitTimer = () => ({
  type: GAME.REINIT_TIMER
});

export const timerStart = () => (dispatch, getState) => {
  clearInterval(timer);
  timer = setInterval(() => {
    const { timeLeft, username } = getState().game;
    if (timeLeft === 0) {
      dispatch(timerStop());
      dispatch(hitMe(username));
    } else {
      dispatch(tick());
    }
  }, 1000);
  dispatch({ type: GAME.TIMER_START });
};

const timerStop = () => {
  clearInterval(timer);
  return { type: GAME.TIMER_STOP };
};

const tick = () => ({
  type: GAME.TICK
});

export const exit = ownProps => {
  ownProps.history.push("/");
  return {
    type: GAME.EXIT
  };
};

export const clearState = () => {
  clearInterval(timer);
  return {
    type: GAME.CLEAR_STATE
  };
};
