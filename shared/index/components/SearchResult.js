import React from 'react';
import styles from '../scss/searchResult.scss';

export default function ({
  singer, song, id, imageId,
}) {
  return (
    <a href={`/song/${id}?singer=${singer}&song=${song}&imageId=${imageId}`} className={styles.result}>
      <div className={styles.misicIcon}>
        <i className="material-icons">library_music</i>
      </div>
      <div>
        <div className={styles.title} key="title">
          <span>{song}</span>
        </div>
        <div className={styles.author} key="author">{singer}</div>
      </div>
    </a>
  );
}
