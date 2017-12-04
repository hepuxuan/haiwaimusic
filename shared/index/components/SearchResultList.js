import React from 'react';
import SearchResult from './SearchResult';
import styles from '../scss/searchResultList.scss';

export default function ({ searchResults }) {
  return (
    <div className={styles.searchitems}>
      {
        searchResults.map(({
          singer, song, id, imageId,
        }, index) => (
          <div key={index} className={styles.searchItem}>
            <SearchResult singer={singer} song={song} id={id} imageId={imageId} />
          </div>
        ))
      }
    </div>
  );
}
