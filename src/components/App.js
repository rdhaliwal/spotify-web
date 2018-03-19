import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import { fetchAllPlaylists } from '../actions/playlists.js';
import { fetchTracks } from '../actions/tracks.js';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllPlaylists();
  }

  render() {
    let { loadingStatus, allPlaylists } = this.props.playlists;

    return (
      <div className="App">
        <h1>Spotify thing.</h1>
        <hr />
        <div>
          Load playlists: {loadingStatus}

          {
            allPlaylists.length > 0 &&
            allPlaylists.map((playlist, index) => <li key={`song-${index}`}>{playlist.name}</li>)
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
  fetchAllPlaylists: () => fetchAllPlaylists(dispatch),
  fetchTracks: () => fetchTracks(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

