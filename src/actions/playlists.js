import { API } from '../lib/api.js';
import { ACTION, LOADING } from './types.js';

const playlistStatus = (loadingStatus) => ({
  loadingStatus: loadingStatus,
  type: ACTION.SET_PLAYLISTS_LOADING_STATUS,
});

export const fetchAllPlaylists = (dispatch) => {
  dispatch(playlistStatus(LOADING.IN_PROGRESS));

  return API.fetchAllPlaylists()
    .then((playlists) => {
      dispatch(playlistStatus(LOADING.SUCCESS));
      dispatch({
        type: ACTION.PLAYLISTS_SAVE,
        playlists: playlists.items
      });
    }).catch(err => {
      console.error(err);
      dispatch(playlistStatus(LOADING.ERROR));
    });
};

export const setActivePlaylist = (playlist) => ({
  type: ACTION.PLAYLISTS_SELECT,
  playlist: playlist
});

