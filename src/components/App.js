import React from 'react';
import '../App.css';
import { getAccessToken } from '../lib/authentication.js';


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

const SongImage = ({images, name}) => {
  let filteredImages = images.filter(img => img.height < 100);
  if (filteredImages.length > 0) {
    let image = filteredImages[0];
    return (
      <img src={image.url} alt={name} width={image.width} height={image.height} />
    );
  } else {
    return null;
  }
};

const SongComponent = ({is_local, track}) => {
  if (is_local) {
    return null;
  } else {
    return (
      <div>
        <SongImage {...track.album}/>
        <audio controls>
          <source type="audio/mpeg" src={track.preview_url}/>
          Audio tag not supported
        </audio>
        <p> {track.name} </p>
        <hr />
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    let accessToken = getAccessToken();

    this.state = {
      accessToken: accessToken,
      songs: []
    };
  }

  async componentDidMount() {
    if (this.state.accessToken !== null) {
      let playlists = await fetchAllPlaylists(this.state.accessToken);
      let the_playlist = await fetchPlaylistDetails(playlists.items[0], this.state.accessToken);
      let songs = the_playlist.tracks.items;
      this.setState({songs});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Spotify thing.</h1>
        </header>
        <p>
          Your temporary access token: {this.state.accessToken}
        </p>
        <div>
          Songs:
          {this.state.songs.map((song, index) => <SongComponent {...song} key={`song-${index}`} />)}
        </div>
      </div>
    );
  }
}

export default App;
