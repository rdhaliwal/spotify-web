// import { ACTION, LOADING } from '../actions/types.js';
import { ACTION } from '../actions/types.js';

let initialState = {
  activeTrack: {
    name: null
  },
};

const setActiveTrack = (state, track) => ({
  ...state,
  activeTrack: track,
});

export const tracks = (state = initialState, action) => {
  switch (action.type) {

    case ACTION.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action.track);

    default:
      return state;
  }
};
