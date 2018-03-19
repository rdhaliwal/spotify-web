import { ACTION, LOADING } from '../actions/types.js';

let initialState = {
  loadingStatus: LOADING.READY,
  allPlaylists: [],
  activePlaylist: {},
};

const setPlaylistLoadingStatus = (state, loadingStatus) => ({
  ...state,
  loadingStatus: loadingStatus,
});

const savePlaylists = (state, playlists) => ({
  ...state,
  allPlaylists: playlists
});

const setActivePlaylist = (state, playlist) => ({
  ...state,
  activePlaylist: playlist
});

export const playlists = (state = initialState, action) => {
  switch (action.type) {

    case ACTION.SET_PLAYLISTS_LOADING_STATUS:
      return setPlaylistLoadingStatus(state, action.loadingStatus);

    case ACTION.PLAYLISTS_SAVE:
      return savePlaylists(state, action.playlists);

    case ACTION.PLAYLISTS_SELECT:
      return setActivePlaylist(state, action.playlist);

    default:
      return state;
  }
};


// const setPlaylistTracksLoadingStatus = (state, playlist, loadingStatus) => ({
//   ...playlist,
//   playlist.loadingStatus: LOADING.IN_PROGRESS,
// });

    // case ACTION.SET_PLAYLIST_TRACKS_LOADING_STATUS:
    //   return setPlaylistTracksLoadState(state, action.playlist, action.loadingStatus);

