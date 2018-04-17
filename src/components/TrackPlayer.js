import React from 'react';
import { TrackPlayerAudio } from '../components/TrackPlayerAudio.js';
import { TrackPlayerAlbumArt } from '../components/TrackPlayerAlbumArt.js';

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

