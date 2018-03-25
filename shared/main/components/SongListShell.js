import React from 'react';
import range from 'lodash/range';
import Cell from './Cell';
import styles from '../scss/songListShell.scss';

export default function () {
  return (
    <div>
      <div className={styles.title}>
        <Cell height={20} />
      </div>
      <div className={styles.body}>
        {range(4).map(index => (
          <div className={styles.detailBox} key={index}>
            <div className={styles.imageBox} />
            <div className={styles.textBox}>
              <Cell height={8} width="70%" />
            </div>
            <div className={styles.textBox}>
              <Cell height={8} width="40%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
