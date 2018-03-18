const parseJsonResponse = (response) => {
  let json = response.json();

  if (response.ok) {
    return json;
  } else {
    // Reject the promise if the response is a 500
    return json.then(err => {throw err;});
  }
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

  return fetch(url, GET_HEADER).then(response => parseJsonResponse(response));
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

  return fetch(url, GET_HEADER).then(response => parseJsonResponse(response));
};

export const fetchSongs = async (accessToken) => {
  let playlists = await fetchAllPlaylists(accessToken);
  let the_playlist = await fetchPlaylistDetails(playlists.items[0], accessToken);
  return the_playlist.tracks.items;
}
