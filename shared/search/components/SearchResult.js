import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import styles from '../scss/searchResult.scss';

function SearchResult({
  singer, song, songId, imageId, isInPlayList, mid, store,
}) {
  const imageUrl = `//imgcache.qq.com/music/photo/album_300/${imageId %
    100}/300_albumpic_${imageId}_0.jpg`;
  return (
    <Link to={`/song/${song}?&mid=${mid}`} className={styles.result}>
      <div className={styles.innerBox}>
        <div className={styles.image}>
          <Image width="100%" src={imageUrl} alt="" />
        </div>
        <div>
          <div className={styles.title} key="title">
            <span>{song}</span>
          </div>
          <div className={styles.author} key="author">
            {singer}
          </div>
        </div>
      </div>
      <div>
        <button
          className={`${styles.likeButton} ${isInPlayList ? styles.isActive : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            store.addToList({
              singer,
              song,
              songId,
              imageId,
              mid,
            });
          }}
        >
          {isInPlayList ? (
            <i className="material-icons">star</i>
          ) : (
            <i className="material-icons">star_border</i>
          )}
        </button>
      </div>
    </Link>
  );
}

export default inject('store')(observer(SearchResult));
