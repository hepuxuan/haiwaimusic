import React from 'react';
import styles from '../scss/nav.scss';

export default function ({ handleAddToPlayList }) {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <i className="material-icons">keyboard_arrow_left</i>
      </a>
      <button onClick={handleAddToPlayList}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}
