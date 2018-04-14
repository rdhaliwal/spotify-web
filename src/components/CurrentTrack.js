import React from 'react';

const SongImage = ({images, name}) => {
  let image = images.find(img => img.height < 100);
  if (image == null) { return null; }

  return (
    <img
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.audioPlayerRef.current == null) { return; }

    this.audioPlayerRef.current.pause();
    this.audioPlayerRef.current.load();
    this.audioPlayerRef.current.play().catch((e) => {});

    this.audioPlayerRef.current.onended = () => {
      this.props.nextTrack(this.props.trackPointer)
    };
  }

  render() {
    let { track } = this.props;
    if (track == null) { return null; }


    return (
      <div>
        <SongImage {...track.album}/>
        { track.previewUrl == null &&
          <div> No Preview Available </div>
        }
        <audio controls ref={this.audioPlayerRef}>
          <source type="audio/mpeg" src={track.previewUrl}/>
          Audio tag not supported
        </audio>
        <button onClick={(e) => this.props.previousTrack(this.props.trackPointer)}>
          Previous
        </button>
        <TrackDetails track={track} />
        <button onClick={(e) => this.props.nextTrack(this.props.trackPointer)}>
          Next
        </button>
      </div>
    );
  }
}
