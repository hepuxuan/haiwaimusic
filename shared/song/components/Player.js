import React from 'react';
import Image from './Image';
import Lyric from './Lyric';
import ControlPanel from './ControlPanel';
import styles from '../scss/player.scss';

export default class Player extends React.Component {
  state = {
    isPaused: false,
    isStopped: true,
    loop: false,
    renderAudio: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        renderAudio: true,
      });
    }, 500);
  }

  play = () => {
    this.audio.play();
    this.setState({
      isStopped: false,
      isPaused: false,
    });
  }

  pause = () => {
    this.audio.pause();
    this.setState({
      isPaused: true,
      isStopped: false,
    });
  }

  handlePlay = () => {
    this.setState({
      isStopped: false,
      isPaused: false,
    });
  }

  handleEnded = () => {
    this.setState({
      isStopped: true,
      isPaused: false,
    });
    if (this.state.loop) {
      setTimeout(() => {
        this.play();
      }, 500);
    } else {
      this.props.onPlayNext();
    }
  }

  handleToggleLoop = () => {
    this.setState(prevState => ({
      loop: !prevState.loop,
    }));
  }

  render() {
    const {
      songId, imageId, lyric, onPlayNext, onPlayPrev, onOpenPlayList,
    } = this.props;
    const { isPaused, isStopped } = this.state;
    const isPlaying = !isPaused && !isStopped;
    return (
      <div className={styles.audioPlayer}>
        <Image imageId={imageId} isPlaying={isPlaying} />
        {
          lyric && <Lyric
            lyric={lyric}
            isPaused={isPaused}
            isStopped={isStopped}
          />
        }
        {
          this.state.renderAudio && (
            <audio
              ref={(r) => { this.audio = r; }}
              src={`http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`}
              onEnded={this.handleEnded}
              autoPlay
              onPlay={this.handlePlay}
            />
          )
        }
        <ControlPanel
          loop={this.state.loop}
          onToggleLoop={this.handleToggleLoop}
          onPlay={this.play}
          onPause={this.pause}
          isPlaying={isPlaying}
          onPlayNext={onPlayNext}
          onPlayPrev={onPlayPrev}
          onOpenPlayList={onOpenPlayList}
        />
      </div>
    );
  }
}
