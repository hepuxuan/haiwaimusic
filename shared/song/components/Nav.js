import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../scss/nav.scss';

function Nav({ handleAddToPlayList, location }) {
  return (
    <div className={styles.navbar}>
      <Link to={`/${location.search}`}>
        <i className="material-icons">keyboard_arrow_left</i>
      </Link>
      <button onClick={handleAddToPlayList}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}

export default withRouter(Nav);
