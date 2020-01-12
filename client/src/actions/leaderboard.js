import axios from "axios";

export const BOARD = {
  GET_LEADERBOARD_BEGIN: "GET_LEADERBOARD_BEGIN",
  GET_LEADERBOARD_SUCCESS: "GET_LEADERBOARD_SUCCESS",
  GET_LEADERBOARD_FAILED: "GET_LEADERBOARD_BEGIN"
};

export const getLeaderboard = () => {
  return dispatch => {
    dispatch(getLeaderboardBegin());
    axios
      .get(`http://localhost:5051/api/leaderboard`)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };
};

const getLeaderboardBegin = () => ({
  type: GAME.GET_LEADERBOARD_BEGIN
});
const getLeaderboardSuccess = payload => ({
  type: GAME.GET_LEADERBOARD_SUCCESS,
  payload
});
const getLeaderboardFailed = error => ({
  type: GAME.GET_LEADERBOARD_FAILED,
  error
});
