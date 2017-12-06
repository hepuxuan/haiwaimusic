import React from 'react';
import find from 'lodash/find';
import { Menu, MenuItem } from '../../components/Menu';
import styles from '../scss/searchResult.scss';
import { getPlayList, updatePlayList } from '../../utils';

function handleAddToList(item) {
  const existingList = getPlayList();
  if (find(existingList, ({ id }) => id === item.id)) {
    return;
  }
  updatePlayList(getPlayList().concat(item));
}

export default function ({
  singer, song, id, imageId,
}) {
  return (
    <a href={`/song/${song}?singer=${singer}&songId=${id}&imageId=${imageId}`} className={styles.result}>
      <div className={styles.innerBox}>
        <div className={styles.misicIcon}>
          <i className="material-icons">music_note</i>
        </div>
        <div>
          <div className={styles.title} key="title">
            <span>{song}</span>
          </div>
          <div className={styles.author} key="author">{singer}</div>
        </div>
      </div>
      <Menu>
        <MenuItem
          onClick={() => {
            window.location.assign(`/song/${song}?singer=${singer}&songId=${id}&imageId=${imageId}`);
          }}
        >
          播放
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAddToList({
              singer, song, id, imageId,
            });
          }}
        >
          添加至列表
        </MenuItem>
      </Menu>
    </a>
  );
}
