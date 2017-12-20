import React from 'react';
import find from 'lodash/find';
import SearchResult from './SearchResult';
import styles from '../scss/searchResultList.scss';

export default function ({ searchResults, playList, handleAddToList }) {
  return (
    <div className={styles.searchitems}>
      {
        searchResults.map(({
          singer, song, songId, imageId, mid,
        }, index) => (
          <div key={index} className={styles.searchItem}>
            <SearchResult
              isInPlayList={find(playList, _song => _song.songId === songId)}
              singer={singer}
              song={song}
              songId={songId}
              mid={mid}
              imageId={imageId}
              handleAddToList={handleAddToList}
            />
          </div>
        ))
      }
    </div>
  );
}
