import React from 'react';
import { formatTime } from '../../utils';
import styles from '../scss/progressBar.scss';

export default class ProgressBar extends React.Component {
  state = {
    current: 0,
    isDragging: false,
  }

  handleDrag = (e) => {
    this.handleMove(e.clientX);
  }

  handleTouchMove = (e) => {
    this.handleMove(e.touches[0].clientX);
  }

  handleMove(clientX) {
    const { duration } = this.props;
    const rect = this.progressDom.getBoundingClientRect();
    const current = duration * ((clientX - rect.left) / rect.width);
    if (current >= 0 && current <= duration) {
      this.setState({
        current,
      });
    }
  }

  handleDragStart = () => {
    this.setState({
      isDragging: true,
      current: this.props.current,
    });
  }

  handleDragEnd = () => {
    this.props.onForward(this.state.current);
    this.setState({
      isDragging: false,
      current: 0,
    });
  }

  render() {
    let current;
    if (this.state.isDragging) {
      current = this.state.current;
    } else {
      current = this.props.current;
    }
    const { duration } = this.props;
    const progress = duration ? (current / duration) * 100 : 0;
    return (
      <div className={styles.playerStats}>
        <div className={styles.time}>{formatTime(current)}</div>
        <div ref={(r) => { this.progressDom = r; }} className={styles.progressBar}>
          <div className={styles.background} />
          <div style={{ width: `${progress}%` }} className={styles.progress} />
          <div
            style={{ left: `calc(${progress}% - 25px)` }}
            className={styles.slideRoot}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onDrag={this.handleDrag}
            onTouchStart={this.handleDragStart}
            onTouchEnd={this.handleDragEnd}
            onTouchMove={this.handleTouchMove}
          >
            <div className={styles.slide} />
          </div>
        </div>
        <div className={styles.time}>{formatTime(duration)}</div>
      </div>
    );
  }
}
