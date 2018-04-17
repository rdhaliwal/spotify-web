import React from 'react';

const TrackPlayerAlbumArt = ({images, name, isPlaying, togglePlaying}) => {
  let image = images.find(img => img.height > 200 && img.height < 400);
  if (image == null) { return null; }

  let classNames = 'TrackPlayer-albumArt ';
  if (!isPlaying) { classNames += 'is-paused '; }

  return (
    <div className={classNames} onClick={(e) => togglePlaying(isPlaying)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <mask id="TrackPlayer-albumMask">
            <circle id="outer" cx="50" cy="50" r="50" fill="white"></circle>
            <circle id="inner" cx="50" cy="50" r="10" fill="black"></circle>
          </mask>
        </defs>
        <image
          width="100%"
          height="100%"
          mask="url(#TrackPlayer-albumMask)"
          xlinkHref={image.url}>
        </image>
      </svg>
    </div>
  );
};

const TrackPlayerDetails = ({track}) => {
  return (
    <div>
      <p>{track.name}</p>
      <p>{track.artists.map(a => a.name).join(' ')}</p>
    </div>
  );
};

export const TrackPlayer = (props) => {
  if (props.track == null) { return null; }

  return (
    <div>
      <TrackPlayerAlbumArt
        isPlaying={props.playState.playing}
        togglePlaying={props.togglePlaying}
        {...props.track.album}
        />
      <TrackPlayerAudio
        playing={props.playState.playing}
        {...props}
        />
      <div>
        <TrackPlayerDetails track={props.track} />
        <button onClick={(e) => props.previousTrack(props.trackPointer, props.playlist)}>
          Previous
        </button>
        <button onClick={(e) => props.togglePlaying(props.playState.playing)}>
          Play/Pause
        </button>
        <button onClick={(e) => props.nextTrack(props.trackPointer, props.playlist)}>
          Next
        </button>
      </div>
    </div>
  );
};

export class TrackPlayerAudio extends React.Component {
  constructor(props) {
    super(props);

    this.setPlayOrPaused = this.setPlayOrPaused.bind(this);
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
      this.props.nextTrack(this.props.trackPointer, this.props.playlist);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.track == null || this.props.track == null) {
      return;
    }

    if (this.props.track.previewUrl !== prevProps.track.previewUrl) {
      this.audioPlayerRef.current.load();
    } else if (this.props.track.previewUrl == null && this.props.trackPointer !== this.props.playlist.tracks.length-1) {
      // Need to rethink, redo, and fix this 'timeout' thing for empty songs
      // setTimeout(() => {
      //   this.props.nextTrack(this.props.trackPointer, this.props.playlist);
      // }, 3000);
    }

    this.setPlayOrPaused();
  }

  setPlayOrPaused() {
    let audioPlayer = this.audioPlayerRef.current;
    if (this.props.playing) {
      audioPlayer.play().catch(e => {});
    } else if (audioPlayer != null) {
      audioPlayer.pause();
    }
  }

  render() {
    let { track } = this.props;
    this.setPlayOrPaused();

    return (
      <div>
        <audio controls={false} ref={this.audioPlayerRef}>
          <source type="audio/mpeg" src={track.previewUrl}/>
          Audio tag not supported
        </audio>
        { track.previewUrl != null &&
          <span>
            {this.state.currentTime} / {this.state.trackDuration}
          </span>
        }
        { track.previewUrl == null &&
          <span> No Preview Available.</span>
        }
      </div>
    );
  }
}

