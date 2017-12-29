import React from 'react';
import styles from '../scss/image.scss';

export default function ({ imageId, isPlaying }) {
  const url = `//imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
  return <img width="50%" className={`${styles.songImage} ${isPlaying ? styles.rotateImage : ''}`} src={url} alt="" />;
}
