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

  handlePlay = () => {
    if (this.props.store.audio) {
      this.props.store.audio.play();
    }
  }

  render() {
    const { onOpenPlayList, store } = this.props;
    return (
      <React.Fragment>
        <div className={styles.audioPlayer}>
          <Image />
          <Lyric />
          <ControlPanel
            onPlayNext={store.playNext}
            onPlayPrev={store.playPrev}
            onOpenPlayList={onOpenPlayList}
          />
        </div>
      </React.Fragment>
    );
  }
}
