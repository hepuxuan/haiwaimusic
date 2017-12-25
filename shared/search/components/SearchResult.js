import React from 'react';
import styles from '../scss/searchResult.scss';

export default function ({
  singer, song, songId, imageId, isInPlayList, handleAddToList, mid,
}) {
  return (
    <a href={`/song/${song}?&mid=${mid}`} className={styles.result}>
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
      <div>
        <button
          className={`${styles.likeButton} ${isInPlayList ? styles.isActive : ''}`}
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToList({
            singer, song, songId, imageId, mid,
          });
        }}
        >{
          isInPlayList ? '♥' : '♡'
        }
        </button>
      </div>
    </a>
  );
}
