import { GAME } from "../actions/game";

const initialState = {
  loading: false,
  error: null,
  playerCards: [],
  computerCards: [],
  username: "",
  timeLeft: 10,
  winner: null,
  isTimeout: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case GAME.START_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GAME.START_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        playerCards: action.playerCards,
        username: action.username
      };
    case GAME.START_GAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GAME.HIT_ME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GAME.HIT_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    case GAME.HIT_ME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GAME.STAND_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GAME.STAND_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
        timeLeft: 10
      };
    case GAME.STAND_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GAME.REINIT_TIMER:
      return {
        ...state,
        timeLeft: 10
      };
    case GAME.TIMER_STOP:
      return {
        ...state,
        timeLeft: 0,
        isTimeout: true
      };
    case GAME.TICK:
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      };
    case GAME.EXIT:
      return initialState;

    case GAME.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default game;
