import React from 'react';

export const TrackPlayerAlbumArt = ({images, name, isPlaying, togglePlaying}) => {
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
