import React from 'react';
import styles from '../scss/hotkeyword.scss';

export default function ({ children, onClick }) {
  return (
    <button className={styles.roundButton} onClick={() => onClick(children)}>{children}</button>
  );
}
