import React from 'react';
import { inject, observer } from 'mobx-react';
import Image from './Image';
import Lyric from './Lyric';
import ControlPanel from './ControlPanel';
import styles from '../scss/player.scss';

function Player({ onOpenPlayList, store }) {
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

export default inject('store')(observer(Player));
