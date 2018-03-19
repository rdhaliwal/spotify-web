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


describe('initial state', () => {
  it('returns the intial state', () => {
    let result = playlists(initialState, {type: null});

    expect(result).toEqual(initialState);
  });
});

describe('all playlists', () => {

 it('sets the playlists loading status', () => {
    let expectedResult = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [],
      activePlaylist: {},
    };

    let result = playlists(initialState, {
      type: ACTION.SET_PLAYLISTS_LOADING_STATUS,
      loadingStatus: LOADING.SUCCESS
    });

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

});

describe('active playlists', () => {

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

});
