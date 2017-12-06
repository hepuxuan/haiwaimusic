import React from 'react';
import ListItem from './ListItem';
import styles from '../scss/playList.scss';

export default function ({ playList, onRemoveSong }) {
  return (
    <div className={styles.mylist}>
      {
        playList.map(song => (
          <div className={styles.listItem} key={song.id}>
            <ListItem {...song} />
            <div>
              <button onClick={() => { onRemoveSong(song.id); }}>
                &#10006;
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
