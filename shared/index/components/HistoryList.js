import React from 'react';
import styles from '../scss/historyList.scss';

export default function ({ searchHistory, onSelect }) {
  return (
    <div className={styles.searchHistory}>
      { !!searchHistory.length && <div className={styles.title}>搜索历史</div> }
      {
        searchHistory.map((history, index) => (
          <div key={index}>
            <button onClick={() => { onSelect(history); }}>{history}</button>
          </div>
        ))
      }
    </div>
  );
}
