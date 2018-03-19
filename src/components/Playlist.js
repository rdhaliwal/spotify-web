import React from 'react';

export default class Playlist extends React.Component {
  render() {
    return (
      <div>
        <button onClick={(event) => this.props.setActivePlaylist(this.props.playlist)}>
          {this.props.playlist.name}
        </button>
      </div>
    );
  }
}