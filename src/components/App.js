import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import * as PLAYLIST_ACTIONS from '../actions/playlists.js';
import * as TRACK_ACTIONS from '../actions/tracks.js';

import { Playlist } from './Playlist.js';
import { Tracklist } from './Tracklist.js';
import { TrackPlayer } from './TrackPlayer.js';

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
            <TrackPlayer
              track={activeTrack}
              trackPointer={activeTrackPointer}
              playlist={activePlaylist}
              nextTrack={this.props.nextTrack}
              previousTrack={this.props.previousTrack}
              playState={this.props.playState}
              togglePlaying={this.props.togglePlaying}
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
  playlists: state.playlists,
  playState: state.playState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPlaylists: () => PLAYLIST_ACTIONS.fetchAllPlaylists(dispatch),
  setActivePlaylist: (playlist) => PLAYLIST_ACTIONS.setActivePlaylist(dispatch, playlist),
  fetchTracksForPlaylist: (playlist) => TRACK_ACTIONS.fetchTracksForPlaylist(dispatch, playlist),
  setActiveTrack: (pointer, playlist) => TRACK_ACTIONS.setActiveTrack(dispatch, pointer, playlist),
  nextTrack: (trackPointer, playlist) => TRACK_ACTIONS.nextTrack(dispatch, trackPointer, playlist),
  previousTrack: (trackPointer, playlist) => TRACK_ACTIONS.previousTrack(dispatch, trackPointer, playlist),
  togglePlaying: (playing) => TRACK_ACTIONS.togglePlaying(dispatch, playing),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

