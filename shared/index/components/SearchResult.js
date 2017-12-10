import React from 'react';
import find from 'lodash/find';
import { Menu, MenuItem } from '../../components/Menu';
import styles from '../scss/searchResult.scss';
import { getPlayList, updatePlayList } from '../../utils';

function handleAddToList(item) {
  const existingList = getPlayList();
  if (find(existingList, ({ songId }) => songId === item.songId)) {
    return;
  }
  updatePlayList(getPlayList().concat(item));
}

export default function ({
  singer, song, songId, imageId,
}) {
  return (
    <a href={`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`} className={styles.result}>
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
            window.location.assign(`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`);
          }}
        >
          播放
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAddToList({
              singer, song, songId, imageId,
            });
          }}
        >
          添加至列表
        </MenuItem>
      </Menu>
    </a>
  );
}
