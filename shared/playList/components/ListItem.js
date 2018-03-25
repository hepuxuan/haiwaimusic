import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/listItem.scss';

export default function ({
  song, singer, mid, imageId,
}) {
  const imageUrl = `//imgcache.qq.com/music/photo/album_300/${imageId %
    100}/300_albumpic_${imageId}_0.jpg`;
  return (
    <Link to={`/song/${song}?mid=${mid}`} className={styles.result}>
      <div className={styles.item}>
        <div className={styles.image}>
          <img width="100%" src={imageUrl} alt="" />
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
    </Link>
  );
}
