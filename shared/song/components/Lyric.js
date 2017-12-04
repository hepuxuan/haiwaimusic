import React from 'react';
import styles from '../scss/lyric.scss';
import Lrc from './Lrc';

export default class Lyric extends React.Component {
  state = {
    currentLine: '',
  }

  componentDidMount() {
    this.lrc = new Lrc(this.props.lyric, this.handleOutput);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isStopped && nextProps.isStopped) {
      this.lrc.stop();
    } else if (this.props.isStopped && !nextProps.isStopped) {
      this.lrc.play();
    }

    if (this.props.isPaused !== nextProps.isPaused) {
      this.lrc.pauseToggle();
    }
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
