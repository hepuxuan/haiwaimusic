import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from '../scss/lyric.scss';

function Lyric({ store: { currentLine } }) {
  return (
    <div className={styles.lyricLine}>{currentLine}</div>
  );
}

export default inject('store')(observer(Lyric));
