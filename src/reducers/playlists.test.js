import { playlists } from './playlists.js';
import { ACTION, LOADING } from '../actions/types.js';

let initialState = {
  loadingStatus: LOADING.READY,
  allPlaylists: [],
  activePlaylist: {},
};

beforeEach(() => {
  initialState = {
    loadingStatus: LOADING.READY,
    allPlaylists: [],
    activePlaylist: {},
  };
});

it('returns the intial state', () => {
  let result = playlists(initialState, {type: null});

  expect(result).toEqual(initialState);
});

it('sets the in progress loading status', () => {
  let expectedResult = {
    loadingStatus: LOADING.IN_PROGRESS,
    allPlaylists: [],
    activePlaylist: {},
  };

  let result = playlists(initialState, {type: ACTION.PLAYLISTS_LOAD_BEGIN});

  expect(result).toEqual(expectedResult);
});

it('sets the successful loading status', () => {
  let expectedResult = {
    loadingStatus: LOADING.SUCCESS,
    allPlaylists: [],
    activePlaylist: {},
  };

  let result = playlists(initialState, {type: ACTION.PLAYLISTS_LOAD_SUCCESSFUL});

  expect(result).toEqual(expectedResult);
});

it('sets the error loading status', () => {
  let expectedResult = {
    loadingStatus: LOADING.ERROR,
    allPlaylists: [],
    activePlaylist: {},
  };

  let result = playlists(initialState, {type: ACTION.PLAYLISTS_LOAD_ERROR});

  expect(result).toEqual(expectedResult);
});

it('saves all the playlists', () => {
  let expectedResult = {
    loadingStatus: LOADING.READY,
    allPlaylists: ['harry', 'potter'],
    activePlaylist: {},
  };

  let result = playlists(initialState, {
    type: ACTION.PLAYLISTS_SAVE,
    playlists: ['harry', 'potter']
  });

  expect(result).toEqual(expectedResult);
});

it('sets a new active playlist', () => {
  let expectedResult = {
    loadingStatus: LOADING.READY,
    allPlaylists: [],
    activePlaylist: {
      name: `Yer a wizard, 'arry`
    }
  };

  let result = playlists(initialState, {
    type: ACTION.PLAYLISTS_SELECT,
    playlist: {
      name: `Yer a wizard, 'arry`
    }
  });

  expect(result).toEqual(expectedResult);
});

