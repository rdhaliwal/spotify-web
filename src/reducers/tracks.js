import { ACTION_TYPES } from '../actions/types.js';

export const tracks = (state = [], action) => {
  if (action.type === ACTION_TYPES.SAVE_TRACKS) {
    return [...state, ...action.tracks];
  } else {
    return state;
  }
};
