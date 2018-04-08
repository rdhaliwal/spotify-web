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


export const CurrentTrack = ({track}) => {
  if (track == null) { return null; }

  return (
    <div>
      <SongImage {...track.album}/>
      <audio controls>
        <source type="audio/mpeg" src={track.previewUrl}/>
        Audio tag not supported
      </audio>
      <div>
        <p>{track.name}</p>
        <p>{track.artists.map(a => a.name).join(' ')}</p>
      </div>
    </div>
  );
};

