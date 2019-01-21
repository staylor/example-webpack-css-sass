import React, { Component } from 'react';
import styles from './Counter.scss';

class Counter extends Component {
  state = { count: 0 };

  componentDidMount() {
    this.interval = setInterval(() => this.setState(({ count }) => ({ count: count + 1 })), 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={styles.counterText}>
        Change this text, count will remain the same: <strong>{this.state.count}</strong>
      </div>
    );
  }
}

export default Counter;
