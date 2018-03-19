import { ACTION, LOADING } from '../actions/types.js';

let initialState = {
  loadingStatus: LOADING.READY,
  allPlaylists: [],
  activePlaylist: {},
};

const beginLoadingPlaylist = (state) => ({
  ...state,
  loadingStatus: LOADING.IN_PROGRESS,
});

const successfullyLoadedPlaylist = (state) => ({
  ...state,
  loadingStatus: LOADING.SUCCESS,
});

const errorLoadingPlaylist = (state) => ({
  ...state,
  loadingStatus: LOADING.ERROR
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

    case ACTION.PLAYLISTS_LOAD_BEGIN:
      return beginLoadingPlaylist(state);

    case ACTION.PLAYLISTS_LOAD_SUCCESSFUL:
      return successfullyLoadedPlaylist(state);

    case ACTION.PLAYLISTS_LOAD_ERROR:
      return errorLoadingPlaylist(state);

    case ACTION.PLAYLISTS_SAVE:
      return savePlaylists(state, action.playlists);

    case ACTION.PLAYLISTS_SELECT:
      return setActivePlaylist(state, action.playlist);

    default:
      return state;
  }
};


