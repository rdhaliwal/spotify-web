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

describe('active playlist', () => {

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

describe('modifying single playlist', () => {

  it('updates the loading status for an inactive playlist', () => {
    let state = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1' },
        { id: 'another_playlist' }
      ],
      activePlaylist: {}
    },
    expectedResult = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1', loadingStatus: LOADING.IN_PROGRESS },
        { id: 'another_playlist' }
      ],
      activePlaylist: {},
    };

    let result = playlists(state, {
      type: ACTION.SET_PLAYLIST_TRACKS_LOADING_STATUS,
      playlist: {id: 'playlist_1'},
      loadingStatus: LOADING.IN_PROGRESS
    });

    expect(result).toEqual(expectedResult);
  });

  it('updates the loading status for an active playlist', () => {
    let state = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1' },
        { id: 'another_playlist' }
      ],
      activePlaylist: { id: 'another_playlist' },
    },
    expectedResult = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1', },
        { id: 'another_playlist' , loadingStatus: LOADING.IN_PROGRESS },
      ],
      activePlaylist: { id: 'another_playlist' , loadingStatus: LOADING.IN_PROGRESS },
    };

    let result = playlists(state, {
      type: ACTION.SET_PLAYLIST_TRACKS_LOADING_STATUS,
      playlist: {id: 'another_playlist'},
      loadingStatus: LOADING.IN_PROGRESS
    });

    expect(result).toEqual(expectedResult);
  });

  it('updates the tracks and loading status for a inactive playlist', () => {
    let state = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1' },
        { id: 'another_playlist' }
      ],
      activePlaylist: {},
    },
    expectedResult = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1', loadingStatus: LOADING.SUCCESS, tracks: [ 'Shoop', 'Heroes' ], },
        { id: 'another_playlist' }
      ],
      activePlaylist: {},
    };

    let result = playlists(state, {
      type: ACTION.SAVE_PLAYLIST_TRACKS,
      playlist: {id: 'playlist_1'},
      tracks: [ 'Shoop', 'Heroes' ],
      loadingStatus: LOADING.SUCCESS
    });

    expect(result).toEqual(expectedResult);
  });

  it('updates the tracks and loading status for an active playlist', () => {
    let state = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1' },
        { id: 'another_playlist' }
      ],
      activePlaylist: { id: 'another_playlist' },
    },
    expectedResult = {
      loadingStatus: LOADING.SUCCESS,
      allPlaylists: [
        { id: 'playlist_1'},
        { id: 'another_playlist', loadingStatus: LOADING.SUCCESS, tracks: [ 'Shoop', 'Heroes' ],  }
      ],
      activePlaylist: { id: 'another_playlist', loadingStatus: LOADING.SUCCESS, tracks: [ 'Shoop', 'Heroes' ] }
    };

    let result = playlists(state, {
      type: ACTION.SAVE_PLAYLIST_TRACKS,
      playlist: {id: 'another_playlist'},
      tracks: [ 'Shoop', 'Heroes' ],
      loadingStatus: LOADING.SUCCESS
    });

    expect(result).toEqual(expectedResult);
  });

})
