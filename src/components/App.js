import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import {
  fetchAllPlaylists,
  setActivePlaylist,
} from '../actions/playlists.js';

import {
  fetchTracksForPlaylist,
  setActiveTrack,
  nextTrack,
  previousTrack,
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
      loadingStatus,
      allPlaylists,
      activePlaylist,
      activeTrack,
      activeTrackPointer
    } = this.props.playlists;

    let hasActivePlaylist = Object.keys(activePlaylist).length > 0;

    return (
      <div className="App">
        <div className="App-container">
          <h1>Spotify thing.</h1>
          <div>
            Load playlists: {loadingStatus} <hr />
          </div>
          <div className="App-playbackContainer">
            <CurrentTrack
              track={activeTrack}
              trackPointer={activeTrackPointer}
              nextTrack={this.props.nextTrack}
              previousTrack={this.props.previousTrack}
              />
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
        <BackgroundAlbum track={activeTrack} />
      </div>
    );
  }
}

const BackgroundAlbum = ({track}) => {
  if (track == null) { return null; }
  let image = track.album.images.find(img => img.height > 200 && img.height < 400);
  if (image == null) { return null; }
  return (
    <img
      alt=""
      className="App-background"
      src={image.url} />
  );
};

const mapStateToProps = (state) => ({
  // tracks: state.tracks,
  playlists: state.playlists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPlaylists: () => fetchAllPlaylists(dispatch),
  fetchTracksForPlaylist: (playlist) => fetchTracksForPlaylist(dispatch, playlist),
  setActivePlaylist: (playlist) => dispatch(setActivePlaylist(playlist)),
  setActiveTrack: (pointer) => setActiveTrack(dispatch, pointer),
  nextTrack: (trackPointer) => nextTrack(dispatch, trackPointer),
  previousTrack: (trackPointer) => previousTrack(dispatch, trackPointer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

