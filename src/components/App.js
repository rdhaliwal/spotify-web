import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import {
  fetchAllPlaylists,
  setActivePlaylist,
} from '../actions/playlists.js';
import {
  fetchTracksForPlaylist,
  setActiveTrack
} from '../actions/tracks.js';
import { Playlist } from './Playlist.js';
import { Tracklist } from './Tracklist.js';
import { CurrentTrack } from './CurrentTrack.js';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllPlaylists();
  }

  render() {
    let {
      loadingStatus, allPlaylists,
      activePlaylist
    } = this.props.playlists;
    let hasActivePlaylist = Object.keys(activePlaylist).length > 0;

    return (
      <div className="App">
        <h1>Spotify thing.</h1>
        <div>
          Load playlists: {loadingStatus} <hr />
        </div>
        <div className="App-playbackContainer">
          <CurrentTrack track={this.props.activeTrack} />
        </div>
        <div className="App-playlistTrackContainer">
          <div className="App-playlists">
            {
              allPlaylists.length > 0 &&
              allPlaylists.map((playlist) =>
                <Playlist
                  key={`playlist-${playlist.id}`}
                  playlist={playlist}
                  setActivePlaylist={this.props.setActivePlaylist}
                  fetchTracksForPlaylist={this.props.fetchTracksForPlaylist}
                  />
              )
            }
          </div>
          <div className="App-tracks">
            {
              hasActivePlaylist &&
              <Tracklist
                playlist={activePlaylist}
                setActiveTrack={this.props.setActiveTrack}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  activeTrack: state.tracks.activeTrack,
  playlists: state.playlists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPlaylists: () => fetchAllPlaylists(dispatch),
  fetchTracksForPlaylist: (playlist) => fetchTracksForPlaylist(dispatch, playlist),
  setActivePlaylist: (playlist) => dispatch(setActivePlaylist(playlist)),
  setActiveTrack: (track) => dispatch(setActiveTrack(track)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

