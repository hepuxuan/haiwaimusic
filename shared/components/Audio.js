import React from 'react';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';

function initMediaSession({ song, singer, imageId }) {
  const url = `https//imgcache.qq.com/music/photo/album_300/${imageId %
    100}/300_albumpic_${imageId}_0.jpg`;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song,
    artist: singer,
    artwork: [{ src: url, sizes: '300x300', type: 'image/jpeg' }],
  });
}

@inject('store')
@observer
export default class Audio extends React.Component {
  componentDidMount() {
    this.interval = this.triggerTimer();
    if ('mediaSession' in navigator) {
      if (this.props.store.song) {
        initMediaSession(this.props.store.song);
      }
      reaction(() => this.props.store.song, initMediaSession);
      navigator.mediaSession.setActionHandler('previoustrack', this.props.store.playPrev);
      navigator.mediaSession.setActionHandler('nexttrack', this.props.store.playNext);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  triggerTimer = () =>
    setInterval(() => {
      if (!this.props.store.isStopped && !this.props.store.isPaused) {
        this.props.store.resetTimmer();
      }
    }, 1000);

  handleEnded = () => {
    this.props.store.stop();
    if (this.props.store.loop) {
      setTimeout(() => {
        this.props.store.play();
      }, 500);
    } else {
      const { playList = [] } = this.props.store;
      if (playList.length) {
        const index = findIndex(
          playList,
          ({ songId: existingSongId }) =>
            existingSongId.toString() === this.props.store.song.songId.toString(),
        );
        const nextIndex = (index + 1) % playList.length;
        const { song, mid } = playList[nextIndex];
        window.browserHistory.push(`/song/${song}?&mid=${mid}`);
      }
    }
  };

  render() {
    const {
      renderAudio, song, setDuration, handleLoadAudio, play,
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
          autoPlay
          onPlay={play}
          src={songUrl}
          onEnded={this.handleEnded}
          onLoadedData={handleLoadAudio}
        />
      );
    }
    return null;
  }
}
