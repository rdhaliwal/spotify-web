import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import { getAccessToken } from '../lib/authentication.js';
import { fetchAllPlaylists } from '../actions/playlists.js';
import { fetchTracks } from '../actions/tracks.js';
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

  componentDidMount() {
    if (this.state.accessToken !== null) {
      this.props.fetchAllPlaylists(this.state.accessToken);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Spotify thing.</h1>
        <hr />
        <div>
          Playlists: {this.props.playlists.loadingStatus}

          {
            this.props.playlists.allPlaylists.length > 0 &&
            this.props.playlists.allPlaylists.map((playlist, index) => <li key={`song-${index}`}>{playlist.name}</li>)
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  tracks: state.tracks,
  playlists: state.playlists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPlaylists: token => fetchAllPlaylists(dispatch, token),
  fetchTracks: token => fetchTracks(dispatch, token),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

