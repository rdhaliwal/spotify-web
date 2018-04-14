import React from 'react';

const LocalTrack = ({track}) => {
  return (
    <div>Local: {track.name}</div>
  );
};

const FullTrack = ({track, setActiveTrack, pointerIndex}) => {
  return (
    <button className="u-displayBlock" onClick={(e) => setActiveTrack(pointerIndex)}>
      Full: {track.name}
    </button>
  );
};

const TrackCard = ({track, isLocal, setActiveTrack, pointerIndex}) => {
  return isLocal ? <LocalTrack track={track} /> :
    <FullTrack
      track={track}
      setActiveTrack={setActiveTrack}
      pointerIndex={pointerIndex} />
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
                pointerIndex={index}
                track={t.track}
                isLocal={t.isLocal}
                key={`${this.props.playlist.id}-${index}`}
                setActiveTrack={this.props.setActiveTrack}
                />
            ))
          }
        </ul>
      </div>
    );
  }
}
