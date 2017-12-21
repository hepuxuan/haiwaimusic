import { hydrate } from 'react-dom';
import React from 'react';
import Index from '../shared/search/components';

hydrate(
  <Index />,
  document.getElementById('main'),
);
