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

  // componentDidCatch(error, info) {
  //   debugger;
  //   console.log(`Info: ${info}`);
  //   console.log(`Error: ${error}`);
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.audioPlayerRef.current == null) { return; }

    this.audioPlayerRef.current.pause();
    this.audioPlayerRef.current.load();
    // this.audioPlayerRef.current.play();
    this.audioPlayerRef.current.play().catch((e) => {
      console.log(`Playback issue with: ${prevProps.track.name}`);
      console.log(`Error: ${e}`);
    });
  }

  render() {
    let { track } = this.props;
    if (track == null) { return null; }

    return (
      <div>
        <SongImage {...track.album}/>
        <audio controls ref={this.audioPlayerRef}>
          <source type="audio/mpeg" src={track.previewUrl}/>
          Audio tag not supported
        </audio>
        <TrackDetails track={track} />
      </div>
    );
  }
}
