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
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        renderAudio: true,
      });
    }, 500);
    this.triggerTimer();
  }

  componentWillUnmount() {
    clearInterval(this.triggerTimer);
  }

  triggerTimer = () => {
    setInterval(() => {
      if (!this.state.isStopped && !this.state.isPaused) {
        this.setState(prevState => ({
          current: prevState.current + 1,
        }));
      }
    }, 1000);
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
    this.setState({
      isStopped: false,
      isPaused: false,
    });
  }

  handleEnded = () => {
    this.setState({
      isStopped: true,
      isPaused: false,
      current: 0,
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

  handlePlayNext = () => {
    this.setState({
      current: 0,
    });
    this.props.onPlayNext();
  }

  handlePlayPrev = () => {
    this.setState({
      current: 0,
    });
    this.props.onPlayPrev();
  }

  render() {
    const {
      imageId, lyric, onOpenPlayList, songUrl,
    } = this.props;
    const {
      isPaused, isStopped, current, loop, duration,
    } = this.state;
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
              ref={(r) => {
                this.audio = r;
                if (!this.state.duration && r && r.duration) {
                  this.setState({
                    duration: r.duration,
                  });
                }
              }}
              src={songUrl}
              onEnded={this.handleEnded}
              autoPlay
              onPlay={this.handlePlay}
            />
          )
        }
        <ControlPanel
          loop={loop}
          current={current}
          duration={duration}
          onToggleLoop={this.handleToggleLoop}
          onPlay={this.play}
          onPause={this.pause}
          isPlaying={isPlaying}
          onPlayNext={this.handlePlayNext}
          onPlayPrev={this.handlePlayPrev}
          onOpenPlayList={onOpenPlayList}
        />
      </div>
    );
  }
}
