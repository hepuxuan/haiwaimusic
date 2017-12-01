import React from 'react';
import styles from '../scss/image.scss';

export default function ({ imageId }) {
  const url = `http://imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
  return <img className={styles.songImage} src={url} alt={imageId} />;
}
