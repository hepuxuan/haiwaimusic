import React from 'react';
import Image from './Image';
import styles from '../scss/player.scss';

export default class Player extends React.Component {
  state = {
    isPlaying: false,
    loop: true,
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

  handleToggleLoop = () => {
    this.setState(prevState => ({
      loop: !prevState.loop,
    }));
  }

  render() {
    const { songId, imageId } = this.props;
    return (
      <div className={styles.audioPlayer}>
        <Image imageId={imageId} isPlaying={this.state.isPlaying} />
        <audio
          ref={(r) => { this.audio = r; }}
          loop={this.state.loop}
          src={`http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`}
          onEnded={this.handleEnded}
        />
        <div className={styles.buttonsGroup}>
          <div>
            <button onClick={this.handleToggleLoop} className={`${styles.button} ${styles.buttonSmall} ${this.state.loop ? '' : styles.loopOff}`}>
              <i className="material-icons">loop</i>
            </button>
          </div>
          <div>
            {
              this.state.isPlaying ? (
                <button onClick={this.pause} className={styles.button}>
                  <i className="material-icons">pause</i>
                </button>
              ) : (
                <button onClick={this.play} className={styles.button}>
                  <i className="material-icons">play_arrow</i>
                </button>
              )
            }
          </div>
          <div className="placeholder" />
        </div>
      </div>
    );
  }
}
