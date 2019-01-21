import React from 'react';
import { hot } from 'react-hot-loader/root';
import Counter from './Counter';
import './App.css';

const App = () => (
  <>
    <h1>Hello World: Webpack CSS</h1>
    <Counter />
  </>
);

export default hot(App);
