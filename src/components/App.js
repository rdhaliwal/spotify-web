import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import { fetchAllPlaylists, setActivePlaylist } from '../actions/playlists.js';
import { fetchTracks } from '../actions/tracks.js';

import Playlist from './Playlist.js';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllPlaylists();
  }

  render() {
    let {
      loadingStatus, allPlaylists,
      activePlaylist
    } = this.props.playlists;

    return (
      <div className="App">
        <h1>Spotify thing.</h1>
        <hr />
        <div>
          Load playlists: {loadingStatus}
          <hr />
        </div>
        <div>
          Active playlist:
          {
            Object.keys(activePlaylist).length > 0 ?
              activePlaylist.name :
              'No active playlist'
          }
          <hr />
        </div>
        <div>
          All playlists
          <hr />
          {
            allPlaylists.length > 0 &&
            allPlaylists.map((playlist) =>
              <Playlist
                key={`playlist-${playlist.id}`}
                playlist={playlist}
                setActivePlaylist={this.props.setActivePlaylist}
                />
            )
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
  setActivePlaylist: (playlist) => dispatch(setActivePlaylist(playlist)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

