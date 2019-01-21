import React from 'react';
import { hydrate } from 'react-dom';
import Entry from '../components/Entry';

hydrate(<Entry />, document.getElementById('root'));
