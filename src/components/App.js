import React from 'react';
import '../App.css';
import { getAccessToken } from '../lib/authentication.js';
import { fetchSongs } from '../lib/fetchPlaylistAndSongs.js';
import { TrackCard } from './TrackCard.js';

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
      let songs = await fetchSongs(this.state.accessToken);
      this.setState({songs});
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Spotify thing.</h1>
        <p>
          Your temporary access token: {this.state.accessToken}
        </p>
        <hr />
        <div>
          Songs:
          {
            this.state.songs.length > 0 &&
            this.state.songs.map((song, index) => <TrackCard {...song} key={`song-${index}`} />)
          }
        </div>
      </div>
    );
  }
}

export default App;
