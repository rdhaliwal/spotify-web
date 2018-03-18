import React from 'react';

const SongImage = ({images, name}) => {
  let filteredImages = images.filter(img => img.height < 100);
  if (filteredImages.length > 0) {
    let image = filteredImages[0];
    return (
      <img src={image.url} alt={name} width={image.width} height={image.height} />
    );
  } else {
    return null;
  }
};

export const TrackCard = ({isLocal, track}) => {
  if (isLocal) {
    return null;
  } else {
    return (
      <div>
        <SongImage {...track.album}/>
        <audio controls>
          <source type="audio/mpeg" src={track.previewUrl}/>
          Audio tag not supported
        </audio>
        <p> {track.name} </p>
        <hr />
      </div>
    );
  }
};
