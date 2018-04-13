import React from 'react';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { reaction } from 'mobx';
import { getQueryVariable } from '../utils';

function initMediaSession({ song, singer, imageId }) {
  const url = `https//imgcache.qq.com/music/photo/album_300/${imageId %
    100}/300_albumpic_${imageId}_0.jpg`;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song,
    artist: singer,
    artwork: [{ src: url, sizes: '300x300', type: 'image/jpeg' }],
  });
}

@withRouter
@inject('store')
@observer
export default class Audio extends React.Component {
  componentDidMount() {
    const mid = getQueryVariable(this.props.location.search, 'mid');
    if (mid) {
      this.props.store.loaded = false;
      this.props.store.fetchSongInfo(mid).then(this.props.store.fetchLyric);
    }
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

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const mid = getQueryVariable(nextProps.location.search, 'mid');
      if (mid) {
        this.props.store.loaded = false;
        this.props.store.fetchSongInfo(mid).then(this.props.store.fetchLyric);
      }
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
    const { store } = this.props;
    store.stop();
    if (store.loop) {
      setTimeout(() => {
        store.play();
      }, 500);
    } else {
      const { playList = [] } = store;
      if (playList.length) {
        const index = findIndex(
          playList,
          ({ songId: existingSongId }) =>
            existingSongId.toString() === store.song.songId.toString(),
        );
        const nextIndex = (index + 1) % playList.length;
        const { song, mid } = playList[nextIndex];
        store.setSong(song);
        window.browserHistory.push({
          search: `?song=${song}&&mid=${mid}`,
        });
      }
    }
  };

  render() {
    const {
      song, setDuration, handleLoadAudio, play,
    } = this.props.store;
    if (song) {
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
