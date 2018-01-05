import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styles from '../scss/searchResult.scss';

function SearchResult({
  singer, song, songId, imageId, isInPlayList, mid, store,
}) {
  return (
    <Link to={`/song/${song}?&mid=${mid}`} className={styles.result}>
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
          store.addToList({
            singer, song, songId, imageId, mid,
          });
        }}
        >{
          isInPlayList ? '♥' : '♡'
        }
        </button>
      </div>
    </Link>
  );
}

export default inject('store')(observer(SearchResult));
