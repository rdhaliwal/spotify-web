import React from 'react';
import '../App.css';
import { getAccessToken } from '../lib/authentication.js';
import { fetchSongs } from '../lib/fetchPlaylistAndSongs.js';

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

const TrackCard = ({is_local, track}) => {
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
