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
    duration: null,
    current: 0,
    init: 0,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        renderAudio: true,
      });
    }, 500);
  }

  triggerTimer = () => {
    if (!this.state.isStopped && !this.state.isPaused) {
      setTimeout(() => {
        this.setState({
          current: (new Date()).valueOf(),
        }, this.triggerTimer);
      }, 1000);
    }
  }

  play = () => {
    this.audio.play();
    this.handlePlay();
  }

  pause = () => {
    this.audio.pause();
    this.setState({
      isPaused: true,
      isStopped: false,
    });
  }

  handlePlay = () => {
    if (this.state.isStopped) {
      this.setState({
        init: (new Date()).valueOf(),
      });
    }

    this.setState({
      isStopped: false,
      isPaused: false,
    }, this.triggerTimer);
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
    const {
      isPaused, isStopped, current, init, loop, duration,
    } = this.state;
    const isPlaying = !isPaused && !isStopped;
    const currentProgress = (current - init) / 1000;
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
              ref={(r) => {
                this.audio = r;
                if (!this.state.duration && r && r.duration) {
                  this.setState({
                    duration: r.duration,
                  });
                }
              }}
              src={`http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46`}
              onEnded={this.handleEnded}
              autoPlay
              onPlay={this.handlePlay}
            />
          )
        }
        <ControlPanel
          loop={loop}
          current={currentProgress}
          duration={duration}
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
