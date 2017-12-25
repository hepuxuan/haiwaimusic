import React from 'react';
import styles from '../scss/listItem.scss';

export default function ({
  song, singer, mid,
}) {
  return (
    <a
      href={`/song/${song}?mid=${mid}`}
      className={styles.result}
    >
      <div className={styles.title} key="title">
        <span>{song}</span>
      </div>
      <div className={styles.author} key="author">{singer}</div>
    </a>
  );
}
