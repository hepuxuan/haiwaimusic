import React from 'react';
import Description from './Description';
import Nav from './Nav';
import Player from './Player';
import '../scss/index.scss';

export default function ({
  songId, song, singer, imageId,
}) {
  return (
    <div>
      <Nav />
      <Description song={song} singer={singer} />
      <Player songId={songId} imageId={imageId} />
    </div>
  );
}
