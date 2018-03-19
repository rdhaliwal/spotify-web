import { combineReducers } from 'redux';
import { playlists } from './playlists.js';
import { tracks } from './tracks.js';

export default combineReducers({
  playlists,
  tracks,
})
