import { hydrate } from 'react-dom';
import React from 'react';
import Index from '../shared/index/components';

hydrate(
  <Index {...__SERVER__DATA__} />,
  document.getElementById('main'),
);
