import React from 'react';
import Image from './Image';
import styles from '../scss/player.scss';

export default class Player extends React.Component {
  state = {
    isPlaying: true,
  }

  play = () => {
    this.audio.play();
    this.setState({
      isPlaying: true,
    });
  }

  pause = () => {
    this.audio.pause();
    this.setState({
      isPlaying: false,
    });
  }

  handleEnded = () => {
    this.setState({
      isPlaying: false,
    });
  }

  render() {
    const { songId, imageId } = this.props;
    return (
      <div className={styles.audioPlayer}>
        <Image imageId={imageId} />
        <audio
          ref={(r) => { this.audio = r; }}
          autoPlay
          src={`http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`}
          onEnded={this.handleEnded}
        />
        {
          this.state.isPlaying ? (
            <button onClick={this.pause} className={styles.button}><i className="material-icons">pause</i></button>
          ) : (
            <button onClick={this.play} className={styles.button}><i className="material-icons">play_arrow</i></button>
          )
        }
      </div>
    );
  }
}
