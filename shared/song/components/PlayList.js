import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styles from '../scss/playList.scss';

function PlayList({ store, isPlayListOpen, onClosePlayList }) {
  return isPlayListOpen && (
    <div className={styles.listWrapper}>
      <div className={styles.listRoot}>
        <h3 className={styles.title}>
          播放列表
        </h3>
        <div className={styles.playList}>
          {
            store.playList.map(({
             songId, song, singer, mid,
            }) => (
              <div className={styles.song} key={songId}>
                <Link to={`/song/${song}?mid=${mid}`}>
                  <span className={styles.songName}>{song}</span>
                  <span>-</span>
                  <span className={styles.author}>{singer}</span>
                </Link>
              </div>
            ))
          }
        </div>
        <button
          className={styles.actionArea}
          onClick={() => {
            setTimeout(onClosePlayList, 500);
          }}
        >关闭
        </button>
      </div>
    </div>
  );
}

export default inject('store')(observer(PlayList));
