import React from 'react';
import styles from '../scss/listItem.scss';

export default function ({
  songId, song, singer, imageId, mid,
}) {
  return (
    <a
      href={`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}&mid=${mid}`}
      className={styles.result}
    >
      <div className={styles.title} key="title">
        <span>{song}</span>
      </div>
      <div className={styles.author} key="author">{singer}</div>
    </a>
  );
}
