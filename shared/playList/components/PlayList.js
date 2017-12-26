import React from 'react';
import ListItem from './ListItem';
import styles from '../scss/playList.scss';

export default function ({ playList, onRemoveSong }) {
  return playList.length ? (
    <div className={styles.mylist}>
      {
        playList.map(song => (
          <div className={styles.listItem} key={song.songId}>
            <ListItem {...song} />
            <div>
              <button onClick={() => { onRemoveSong(song.mid); }}>
                &#10006;
              </button>
            </div>
          </div>
        ))
      }
    </div>
  ) : (
    <div className={styles.titleEmpty}>
      您的列表空空如也，立刻
      <a href="/search">搜索歌曲</a>
    </div>
  );
}
