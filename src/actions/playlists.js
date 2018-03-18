import { ACTION_TYPES } from './types.js';

export const savePlaylist = (playlist) => ({
  type: ACTION_TYPES.SAVE_PLAYLIST,
  playlist: playlist
});
