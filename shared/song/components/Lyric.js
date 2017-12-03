import React from 'react';
import styles from '../scss/lyric.scss';


export default class Lyric extends React.Component {
  state = {
    currentLine: '',
  }

  componentDidMount() {
    this.lrc = new Lrc(this.props.lyric, this.handleOutput);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isPlaying && nextProps.isPlaying) {
      this.lrc.play();
    } else if (this.props.isPlaying && !nextProps.isPlaying) {
      this.lrc.pauseToggle();
    }
  }

  replay() {
    this.lrc.stop();
    this.lrc.play();
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
