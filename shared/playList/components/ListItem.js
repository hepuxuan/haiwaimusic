import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/listItem.scss';

export default function ({
  song, singer, mid,
}) {
  return (
    <Link
      to={`/song/${song}?mid=${mid}`}
      className={styles.result}
    >
      <div className={styles.title} key="title">
        <span>{song}</span>
      </div>
      <div className={styles.author} key="author">{singer}</div>
    </Link>
  );
}
