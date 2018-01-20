import React from 'react';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import Image from './Image';
import Lyric from './Lyric';
import ControlPanel from './ControlPanel';
import styles from '../scss/player.scss';

@inject('store') @observer
export default class Player extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.store.renderAudio = true;
    }, 500);
  }

  handlePlayNext = () => {
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

  handlePlayPrev = () => {
    const { playList } = this.props.store;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) =>
          existingSongId.toString() === this.props.store.song.songId.toString(),
      );
      let nextIndex;
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = playList.length - 1;
      }
      const {
        song, mid,
      } = playList[nextIndex];
      window.browserHistory.push(`/song/${song}?&mid=${mid}`);
    }
  }

  handlePlay = () => {
    if (this.props.store.audio) {
      this.props.store.audio.play();
    }
  }

  render() {
    const {
      lyric, onOpenPlayList, store: {
        isPaused, isStopped, current,
      },
    } = this.props;
    return (
      <React.Fragment>
        <div className={styles.audioPlayer}>
          <Image />
          {
            lyric && <Lyric
              lyric={lyric}
              isPaused={isPaused}
              isStopped={isStopped}
              current={current}
            />
          }
          <ControlPanel
            onPlay={this.handlePlay}
            onPause={this.props.store.pause}
            onPlayNext={this.handlePlayNext}
            onPlayPrev={this.handlePlayPrev}
            onOpenPlayList={onOpenPlayList}
          />
        </div>
      </React.Fragment>
    );
  }
}
