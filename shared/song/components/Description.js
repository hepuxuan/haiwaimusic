import React from 'react';
import styles from '../scss/description.scss';

export default function ({ song, singer }) {
  return (
    <div>
      <h1 className={styles.song}>{song}</h1>
      <div className={styles.singerName}>{singer}</div>
    </div>
  );
}
