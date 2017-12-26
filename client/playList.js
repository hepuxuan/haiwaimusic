import { hydrate } from 'react-dom';
import React from 'react';
import PlayList from '../shared/playList/components';

hydrate(
  <PlayList {...__SERVER__DATA__} />,
  document.getElementById('main'),
);
