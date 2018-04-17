import { combineReducers } from 'redux';
import { playlists } from './playlists.js';
import { playState } from './playState.js';

export default combineReducers({
  playlists,
  playState,
})
