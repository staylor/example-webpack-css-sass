import React from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './Entry.scss';

const Entry = () => (
  <section className={styles.main}>
    <h1>A second Webpack entry.</h1>
  </section>
);

export default hot(Entry);
