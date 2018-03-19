import React from 'react';

export class Tracklist extends React.Component {
  render() {
    return (
      <div>
        {this.props.playlist.name}
      </div>
    );
  }
}
