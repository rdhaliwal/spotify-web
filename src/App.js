import React from 'react';
import logo from './logo.svg';
import './App.css';

const getCallbackURL = () => {
  const API_ENDPOINT = `https://accounts.spotify.com`;
  const REQUEST_SCOPES = ["playlist-read-private", "playlist-read-collaborative", "playlist-modify-public", "user-read-recently-played", "playlist-modify-private", "ugc-image-upload", "user-follow-modify", "user-follow-read", "user-library-read", "user-library-modify", "user-read-private", "user-read-email", "user-top-read", "user-read-playback-state"];
  const RESPONSE_TYPE = `token`;

  let result = `${API_ENDPOINT}/authorize?`;
  result += `client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
  result += `&scope=${REQUEST_SCOPES.join('%20')}`;
  result += `&response_type=${RESPONSE_TYPE}`;
  result += `&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}`;

  return result;
};

const parseAccessToken = () => {
  const ACCESS_TOKEN_KEY = "access_token";
  let accessToken = null;

  let params = window.location.hash.substring(1).split("&");
  params.forEach(keyVal => {
    let key = keyVal.split("=")[0];
    let value = keyVal.split("=")[1];
    if (key === ACCESS_TOKEN_KEY) {
      accessToken = value
    }
  });
  return accessToken;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const pathname = window.location.pathname;
    if (pathname === '/callback') {
      let accessToken = parseAccessToken();
      console.log(`Access Token is : ${accessToken}`);
    } else {
      window.location.href = getCallbackURL();
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
