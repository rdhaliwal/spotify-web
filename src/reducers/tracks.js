import { ACTION } from '../actions/types.js';

export const tracks = (state = [], action) => {
  if (action.type === ACTION.SAVE_TRACKS) {
    return [...state, ...action.tracks];
  } else {
    return state;
  }
};
