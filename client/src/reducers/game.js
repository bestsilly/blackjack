import { GAME } from "../actions/game";

const initialState = {
  loading: false,
  error: null,
  payload: []
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
        payload: action.payload
      };
    case GAME.START_GAME_FAILED:
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
