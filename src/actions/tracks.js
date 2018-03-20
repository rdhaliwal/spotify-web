import { API } from '../lib/api.js';
import { ACTION, LOADING } from './types.js';

const playlistLoadingStatus = (loadingStatus, playlist) => ({
  type: ACTION.SET_PLAYLIST_TRACKS_LOADING_STATUS,
  playlist,
  loadingStatus,
});

export const fetchTracksForPlaylist = (dispatch, playlist) => {
  if (playlist.loadingStatus !== LOADING.SUCCESS) {
    dispatch(playlistLoadingStatus(LOADING.IN_PROGRESS, playlist));

    return API.fetchTracksForPlaylist(playlist.href)
      .then((playlist) => {
        dispatch({
          type: ACTION.SAVE_PLAYLIST_TRACKS,
          tracks: playlist.tracks.items,
          loadingStatus: LOADING.SUCCESS,
          playlist,
        });
      }).catch(err => {
        console.error(err);
        dispatch(playlistLoadingStatus(LOADING.ERROR, playlist));
      });
  } // else tracks are already loaded, no need to refetch.
};

