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

const setPlaylistTracksLoadingStatus = (state, playlist, loadingStatus) => {
  let newState = {...state};
  let newPlaylist = {...newState.allPlaylists.find(p => p.id === playlist.id)};

  newPlaylist.loadingStatus = loadingStatus;
  if (newPlaylist.id === newState.activePlaylist.id) {
    newState.activePlaylist = newPlaylist;
  }

  return newState;
};

const savePlaylistTracks = (state, playlist, tracks, loadingStatus) => {
  let newState = {...state};
  let newPlaylist = {...newState.allPlaylists.find(p => p.id === playlist.id)};

  newPlaylist.tracks = tracks;
  newPlaylist.loadingStatus = loadingStatus;
  if (newPlaylist.id === newState.activePlaylist.id) {
    newState.activePlaylist = newPlaylist;
  }

  newState.allPlaylists = newState.allPlaylists.map(p => {
    return p.id === newPlaylist.id ? newPlaylist : p
  });
  return newState;
};

export const playlists = (state = initialState, action) => {
  switch (action.type) {

    case ACTION.SET_PLAYLISTS_LOADING_STATUS:
      return setPlaylistLoadingStatus(state, action.loadingStatus);

    case ACTION.PLAYLISTS_SAVE:
      return savePlaylists(state, action.playlists);

    case ACTION.PLAYLISTS_SELECT:
      return setActivePlaylist(state, action.playlist);

    case ACTION.SET_PLAYLIST_TRACKS_LOADING_STATUS:
      return setPlaylistTracksLoadingStatus(state, action.playlist, action.loadingStatus);

    case ACTION.SAVE_PLAYLIST_TRACKS:
      return savePlaylistTracks(state, action.playlist, action.tracks, action.loadingStatus);

    default:
      return state;
  }
};
