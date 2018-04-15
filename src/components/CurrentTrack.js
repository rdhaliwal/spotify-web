import React from 'react';

const SongImage = ({images, name, isPlaying}) => {
  let image = images.find(img => img.height < 100);
  if (image == null) { return null; }
  let classNames = isPlaying ? 'CurrentTrack-albumArt is-playing' :
    'CurrentTrack-albumArt';

  return (
    <img
      className={classNames}
      src={image.url}
      alt={name}
      width={image.width}
      height={image.height} />
  );
};

const TrackDetails = ({track}) => {
  return (
    <div>
      <p>{track.name}</p>
      <p>{track.artists.map(a => a.name).join(' ')}</p>
    </div>
  );
};

export class CurrentTrack extends React.Component {
  constructor(props) {
    super(props);

    this.audioPlayerRef = React.createRef();
    this.setPlayPaused = this.setPlayPaused.bind(this);
    this.state = {
      playing: false,
    };
  }

  setPlayPaused() {
    let audioPlayer = this.audioPlayerRef.current;
    if (audioPlayer != null && this.state.playing) {
      audioPlayer.play().catch(e => {});
    } else if (audioPlayer != null) {
      audioPlayer.pause();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let audioPlayer = this.audioPlayerRef.current;
    if (audioPlayer == null) { return; }

    if (prevProps.track == null || this.props.track == null) {
      return;
    }

    if (this.props.track.previewUrl !== prevProps.track.previewUrl) {
      audioPlayer.load();
      audioPlayer.onended = () => {
        this.props.nextTrack(this.props.trackPointer)
      };
    }

    this.setPlayPaused();
  }

  render() {
    let { track } = this.props;
    if (track == null) { return null; }
    this.setPlayPaused();

    return (
      <div>
        <SongImage
          isPlaying={this.state.playing}
          {...track.album}
          />
        <div>
          { track.previewUrl == null &&
            <div> No Preview Available </div>
          }
          <audio controls ref={this.audioPlayerRef}>
            <source type="audio/mpeg" src={track.previewUrl}/>
            Audio tag not supported
          </audio>
        </div>
        <div>
          <TrackDetails track={track} />
          <button onClick={(e) => this.props.previousTrack(this.props.trackPointer)}>
            Previous
          </button>
          <button onClick={(e) => this.setState({playing: true})}>
            Play
          </button>
          <button onClick={(e) => this.setState({playing: false})}>
            Pause
          </button>
          <button onClick={(e) => this.props.nextTrack(this.props.trackPointer)}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
