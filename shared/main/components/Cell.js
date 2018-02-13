import React from 'react';
import styles from '../scss/cell.scss';

export default function ({ height, width }) {
  return (
    <div className={styles.cell} style={{ height, width }} />
  );
}
