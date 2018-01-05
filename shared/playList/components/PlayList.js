import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import styles from '../scss/playList.scss';

function onRemoveSong(mid, store) {
  setTimeout(() => {
    store.removeSong(mid);
  }, 500);
}

function PlayList({ store }) {
  return store.playList.length ? (
    <div className={styles.mylist}>
      {
        store.playList.map(song => (
          <div className={styles.listItem} key={song.songId}>
            <ListItem {...song} />
            <div>
              <button onClick={() => { onRemoveSong(song.mid, store); }}>
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
      <Link to="/search">搜索歌曲</Link>
    </div>
  );
}

export default inject('store')(observer(PlayList));
