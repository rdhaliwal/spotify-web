import React from 'react';

const LocalTrack = ({track}) => {
  return (
    <div>Local: {track.name}</div>
  );
};

class FullTrack extends React.Component {
  handleClick() {
    // this.props.selectTrack(this.props.track)
  }

  render() {
    let { track } = this.props;

    return (
      <button className="u-displayBlock" onClick={() => this.handleClick()}>
        Full: {track.name}
      </button>
    );
  }
};

const TrackCard = ({track, isLocal}) => {
  return isLocal ?
    <LocalTrack track={track} /> :
    <FullTrack track={track} />
};

export class Tracklist extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.playlist.name}: {this.props.playlist.loadingStatus}
        </div>
        <ul>
          { this.props.playlist.tracks.length > 0 &&
            this.props.playlist.tracks.map((t, index) => (
              <TrackCard
                track={t.track}
                isLocal={t.isLocal}
                key={`${this.props.playlist.id}-${index}`} />
            ))
          }
        </ul>
      </div>
    );
  }
}
