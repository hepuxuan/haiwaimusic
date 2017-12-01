import { hydrate } from 'react-dom';
import React from 'react';
import 'es6-promise';
import 'isomorphic-fetch';
import Index from '../shared/index/components';

hydrate(
  <Index />,
  document.getElementById('main'),
);
