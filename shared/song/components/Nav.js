import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/nav.scss';

export default function ({ handleAddToPlayList }) {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <i className="material-icons">keyboard_arrow_left</i>
      </Link>
      <button onClick={handleAddToPlayList}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}
