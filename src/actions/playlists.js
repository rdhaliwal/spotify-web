import { API } from '../lib/api.js';
import { ACTION } from './types.js';

export const fetchAllPlaylists = (dispatch) => {
  dispatch({type: ACTION.PLAYLISTS_LOAD_BEGIN});

  return API.fetchAllPlaylists()
    .then((playlists) => {
      dispatch({type: ACTION.PLAYLISTS_LOAD_SUCCESSFUL});
      dispatch({type: ACTION.PLAYLISTS_SAVE, playlists: playlists.items});
    }).catch(err => {
      console.error(err);
      dispatch({type: ACTION.PLAYLISTS_LOAD_ERROR});
    });
};

export const setActivePlaylist = (playlist) => ({
  type: ACTION.PLAYLISTS_SELECT,
  playlist: playlist
});

