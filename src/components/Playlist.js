import React from 'react';

export class Playlist extends React.Component {
  handleClick() {
    let { playlist } = this.props;

    this.props.setActivePlaylist(playlist);
    this.props.fetchTracksForPlaylist(playlist);
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.handleClick()}>
          {this.props.playlist.name}
        </button>
      </div>
    );
  }
}
