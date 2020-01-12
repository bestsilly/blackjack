import { GAME } from "../actions/game";

const initialState = {
  loading: false,
  error: null,
  playerCards: [],
  computerCards: [],
  username: ""
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
        playerCards: action.playerCards
      };
    case GAME.HIT_ME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default game;
