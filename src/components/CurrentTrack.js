import React from 'react';

const SongImage = ({images, name, isPlaying, playPause}) => {
  let image = images.find(img => img.height > 200 && img.height < 400);
  if (image == null) { return null; }

  let classNames = 'CurrentTrack-albumArt ';
  if (!isPlaying) { classNames += 'is-paused '; }

  return (
    <div className={classNames} onClick={(e) => playPause()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <mask id="CurrentTrack-albumMask">
            <circle id="outer" cx="50" cy="50" r="50" fill="white"></circle>
            <circle id="inner" cx="50" cy="50" r="10" fill="black"></circle>
          </mask>
        </defs>
        <image
          width="100%"
          height="100%"
          mask="url(#CurrentTrack-albumMask)"
          xlinkHref={image.url}>
        </image>
      </svg>
    </div>
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

    this.playPause = this.playPause.bind(this);
    this.state = {
      playing: false,
    };
  }

  playPause() {
    this.setState({playing: !this.state.playing});
  }

  render() {
    let { track } = this.props;
    if (track == null) { return null; }

    return (
      <div>
        <SongImage
          isPlaying={this.state.playing}
          playPause={this.playPause}
          {...track.album}
          />
        <SongPlayer
          playing={this.state.playing}
          {...this.props}
          />
        <div>
          <TrackDetails track={track} />
          <button onClick={(e) => this.props.previousTrack(this.props.trackPointer)}>
            Previous
          </button>
          <button onClick={(e) => this.playPause()}>
            Play/Pause
          </button>
          <button onClick={(e) => this.props.nextTrack(this.props.trackPointer)}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export class SongPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.setPlayPaused = this.setPlayPaused.bind(this);
    this.state = {
      currentTime: 0,
      trackDuration: 0,
    };

    this.audioPlayerRef = React.createRef();
  }

  componentDidMount() {
    const audioPlayer = this.audioPlayerRef.current;
    audioPlayer.addEventListener("timeupdate", () => {
      this.setState({currentTime: audioPlayer.currentTime});
      this.setState({trackDuration: audioPlayer.duration});
    });
    audioPlayer.onended = () => {
      this.props.nextTrack(this.props.trackPointer);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.track == null || this.props.track == null) {
      return;
    }

    if (this.props.track.previewUrl !== prevProps.track.previewUrl) {
      this.audioPlayerRef.current.load();
    }

    this.setPlayPaused();
  }

  setPlayPaused() {
    let audioPlayer = this.audioPlayerRef.current;
    if (this.props.playing) {
      audioPlayer.play().catch(e => {});
    } else if (audioPlayer != null) {
      audioPlayer.pause();
    }
  }

  render() {
    let { track } = this.props;
    this.setPlayPaused();

    return (
      <div>
        { track.previewUrl == null &&
          <div> No Preview Available </div>
        }
        <audio controls={false} ref={this.audioPlayerRef}>
          <source type="audio/mpeg" src={track.previewUrl}/>
          Audio tag not supported
        </audio>
        <span>
          {this.state.currentTime} / {this.state.trackDuration}
        </span>
      </div>
    );
  }
}

