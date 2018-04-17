import React from 'react';

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

