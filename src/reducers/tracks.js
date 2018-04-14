// import { ACTION, LOADING } from '../actions/types.js';
// import { ACTION } from '../actions/types.js';

let initialState = {
//   activeTracklist: [],
//   trackPointer: 0,
//   activeTrack: null,
};

// const selectTrack = (state, track) => {
//   // also set the track pointer here or something
//   return {
//     ...state,
//     activeTrack: track,
//   };
// };

// const setActivePlaylist = (state, playlist) => ({
//   ...state,
//   activeTracklist: playlist.tracks.items
// });

// const changeTrack = (state, newPointer) => {
//   if (newPointer >= 0  && newPointer < state.activeTracklist.length ) {
//     return {
//       ...state,
//       trackPointer: newPointer,
//       activeTrack: state.activeTracklist[newPointer]
//     };
//   }
//   return state;
// };

export const tracks = (state = initialState, action) => {
  switch (action.type) {

    // case ACTION.SET_ACTIVE_TRACK:
    //   return selectTrack(state, action.track);

    // case ACTION.CHANGE_TRACK:
    //   return changeTrack(state, action.trackPointer);

    // case ACTION.SAVE_PLAYLIST_TRACKS:
    //   return setActivePlaylist(state, action.playlist);

    default:
      return state;
  }
};
