import React from 'react';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class Audio extends React.Component {
  componentDidMount() {
    this.interval = this.triggerTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  triggerTimer = () => setInterval(() => {
    if (!this.props.store.isStopped && !this.props.store.isPaused) {
      this.props.store.current = this.props.store.current + 1;
    }
  }, 1000)

  handleEnded = () => {
    this.props.store.replay();
    if (this.props.store.loop) {
      setTimeout(() => {
        this.props.store.play();
      }, 500);
    } else {
      const { playList } = this.props.store;
      if (playList.length) {
        const index = findIndex(
          playList,
          ({ songId: existingSongId }) =>
            existingSongId.toString() === this.props.store.song.songId.toString(),
        );
        const nextIndex = (index + 1) % playList.length;
        const {
          song, mid,
        } = playList[nextIndex];
        window.browserHistory.push(`/song/${song}?&mid=${mid}`);
      }
    }
  }

  render() {
    const {
      renderAudio, song, play, setDuration,
    } = this.props.store;
    if (renderAudio && song) {
      const { songUrl } = song;
      return (
        <audio
          ref={(r) => {
            this.props.store.audio = r;
          }}
          onLoadedMetadata={() => {
            setDuration(this.props.store.audio.duration);
          }}
          src={songUrl}
          onEnded={this.handleEnded}
          autoPlay
          onPlay={play}
        />
      );
    }
    return null;
  }
}
