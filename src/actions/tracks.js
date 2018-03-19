import { ACTION } from './types.js';

const changeCaseObject = require('change-case-object');

const parseJsonResponse = (response) => {
  let json = response.json();

  if (response.ok) {
    return json;
  } else {
    // Reject the promise if the response is a 500
    return json.then(err => {throw err;});
  }
};

const convertCases = (json) => {
  return changeCaseObject.camelCase(json);
};

const fetchAllPlaylists = (accessToken) => {
  const API_ENDPOINT = `https://api.spotify.com/v1`;
  let url = `${API_ENDPOINT}/me/playlists`;
  const GET_HEADER = {
    method: 'GET',
    mode: 'cors',
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  return fetch(url, GET_HEADER)
    .then(response => parseJsonResponse(response))
    .then(json => convertCases(json));
};

const fetchPlaylistDetails = (playlist, accessToken) => {
  let url = playlist.href;
  const GET_HEADER = {
    method: 'GET',
    mode: 'cors',
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  return fetch(url, GET_HEADER)
    .then(response => parseJsonResponse(response))
    .then(json => convertCases(json));
};


export const saveTracks = (tracks) => ({
  type: ACTION.SAVE_TRACKS,
  tracks: tracks
});

export const fetchTracks = (dispatch, accessToken) => {
  fetchAllPlaylists(accessToken).then(playlists => {
    return fetchPlaylistDetails(playlists.items[0], accessToken);
  }).then(playlist => {
    dispatch(saveTracks(playlist.tracks.items));
  });
}
