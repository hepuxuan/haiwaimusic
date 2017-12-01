import { hydrate } from 'react-dom';
import React from 'react';
import Song from '../shared/song/components';

const {
  songId, song, singer, imageId,
} = __SERVER__DATA__;

hydrate(
  <Song song={song} singer={singer} songId={songId} imageId={imageId} />,
  document.getElementById('main'),
);
