import React from 'react';
import LazyLoad from 'react-lazy-load';
import styles from './image.scss';

export default function (props) {
  return (
    <div className={styles.imageBox}>
      <LazyLoad>
        <img {...props} />
      </LazyLoad>
    </div>
  );
}
