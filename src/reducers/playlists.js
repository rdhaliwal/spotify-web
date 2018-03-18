import { ACTION_TYPES } from '../actions/types.js';

export const playlists = (state = [], action) => {
  if (action.type === ACTION_TYPES.SAVE_PLAYLIST) {
    return [...state, action.playlist];
  } else {
    return state;
  }
};
