import { getAccessToken } from './authentication.js';
const ChangeCase = require('change-case-object');

// Ideally we'd just inject this via the server.
const ACCESS_TOKEN = getAccessToken();
const API_ENDPOINT = `https://api.spotify.com/v1`;
const GET_HEADER = {
  method: 'GET',
  mode: 'cors',
  headers:{
    'Accept':'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
  }
};

const parseJsonResponse = (response) => {
  let json = response.json();

  if (response.ok) {
    return json;
  } else {
    return json.then(err => {throw err;}); // Reject if it's a 500
  }
};

// Actual API Calls
// =========================================

const fetchAllPlaylists = () => {
  let url = `${API_ENDPOINT}/me/playlists`;

  return fetch(url, GET_HEADER)
    .then(response => parseJsonResponse(response))
    .then(json => ChangeCase.camelCase(json))
};

const fetchTracksForPlaylist = (url) => {
  return fetch(url, GET_HEADER)
    .then(response => parseJsonResponse(response))
    .then(json => ChangeCase.camelCase(json))
};


export const API = {
  fetchAllPlaylists,
  fetchTracksForPlaylist,
};
