import { ACTION } from '../actions/types.js';

let initialState = {
  playing: false
};

const updatePlayingState = (state, playing) => {
  return {
    ...state,
    playing: playing,
  };
};

export const playState = (state = initialState, action) => {
  switch (action.type) {

    case ACTION.UPDATE_PLAYING_STATE:
      return updatePlayingState(state, action.playing);

    default:
      return state;
  }
};
