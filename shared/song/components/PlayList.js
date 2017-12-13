import React from 'react';
import styles from '../scss/playList.scss';

export default function ({ playList, isPlayListOpen, onClosePlayList }) {
  return isPlayListOpen && (
    <div className={styles.listWrapper}>
      <div className={styles.listRoot}>
        <h3 className={styles.title}>
          播放列表
        </h3>
        <div className={styles.playList}>
          {
            playList.map(({
             songId, song, singer, imageId,
            }) => (
              <div className={styles.song} key={songId}>
                <a href={`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`}>
                  <span className={styles.songName}>{song}</span>
                  <span>-</span>
                  <span className={styles.author}>{singer}</span>
                </a>
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
