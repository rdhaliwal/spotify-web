import React from 'react';

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
              <li key={`${this.props.playlist.id}-${index}`}>{t.track.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}
