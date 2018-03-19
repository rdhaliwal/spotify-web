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

const generateGetHeader = (headers) => ({
  method: 'GET',
  mode: 'cors',
  headers:{
    'Accept':'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
});

export const fetchAllPlaylists = (dispatch, accessToken) => {
  dispatch({type: ACTION.PLAYLISTS_LOAD_BEGIN});

  const API_ENDPOINT = `https://api.spotify.com/v1`;
  let url = `${API_ENDPOINT}/me/playlists`;
  let headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  return fetch(url, generateGetHeader(headers))
    .then(response => parseJsonResponse(response))
    .then(json => convertCases(json))
    .then((playlists) => {
      dispatch({type: ACTION.PLAYLISTS_LOAD_SUCCESSFUL});
      dispatch({type: ACTION.PLAYLISTS_SAVE, playlists: playlists.items});
    }).catch(err => {
      console.error(err);
      dispatch({type: ACTION.PLAYLISTS_LOAD_ERROR});
    });
};

