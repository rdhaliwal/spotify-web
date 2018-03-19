import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'

import { getAccessToken } from '../lib/authentication.js';
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
      this.props.fetchTracks(this.state.accessToken);
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
            this.props.tracks.length > 0 &&
            this.props.tracks.map((track, index) => <TrackCard {...track} key={`song-${index}`} />)
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  tracks: state.tracks
});

const mapDispatchToProps = (dispatch) => ({
  fetchTracks: token => fetchTracks(dispatch, token),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

