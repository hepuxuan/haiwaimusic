import React from 'react';
import styles from '../scss/lyric.scss';
import Lrc from './Lrc';

export default class Lyric extends React.Component {
  state = {
    currentLine: '',
  }

  componentDidMount() {
    this.lrc = new Lrc(this.props.lyric, this.handleOutput);
    if (!this.props.isStopped) {
      this.lrc.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lyric !== this.props.lyric) {
      this.lrc = new Lrc(this.props.lyric, this.handleOutput);
      if (!nextProps.isStopped) {
        this.lrc.play();
      }
    }

    if (!this.props.isStopped && nextProps.isStopped) {
      this.lrc.stop();
    } else if (this.props.isStopped && !nextProps.isStopped) {
      this.lrc.play();
    }

    if (this.props.isPaused !== nextProps.isPaused) {
      this.lrc.pauseToggle();
    }
  }

  componentWillUnmount() {
    this.lrc.handler = () => {};
  }

  handleOutput = (currentLine) => {
    this.setState({
      currentLine,
    });
  }

  render() {
    return (
      <div className={styles.lyricLine}>{this.state.currentLine}</div>
    );
  }
}
