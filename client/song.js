import { hydrate } from 'react-dom';
import React from 'react';
import Song from '../shared/song/components';

hydrate(
  <Song {...__SERVER__DATA__} />,
  document.getElementById('main'),
);
