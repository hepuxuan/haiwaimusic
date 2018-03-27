import React from 'react';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
import SearchResult from './SearchResult';
import styles from '../scss/searchResultList.scss';

function SearchResultList({ store }) {
  return (
    <div className={styles.searchitems}>
      {store.searchResult && store.searchResult.map(({
        singer, song, songId, imageId, mid,
      }, index) => (
        <div key={index} className={styles.searchItem}>
          <SearchResult
            isInPlayList={find(store.playList, _song => _song.songId === songId)}
            singer={singer}
            song={song}
            songId={songId}
            mid={mid}
            imageId={imageId}
          />
        </div>
      ))}
    </div>
  );
}

export default inject('store')(observer(SearchResultList));
