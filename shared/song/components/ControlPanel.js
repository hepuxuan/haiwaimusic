import React from 'react';
import styles from '../scss/controlPanel.scss';

export default function ({
  onToggleLoop, onPause, onPlay, isPlaying, loop, onPlayNext, onPlayPrev, onOpenPlayList,
}) {
  return (
    <div className={styles.buttonsGroup}>
      <div>
        <button onClick={onToggleLoop}>
          <i className="material-icons">loop</i>
          {
            loop && <div className={styles.loop1}>1</div>
          }
        </button>
      </div>
      <div>
        <button onClick={onPlayPrev} className={`${styles.button} ${styles.buttonSmall}`}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
      </div>
      <div>
        {
          isPlaying ? (
            <button onClick={onPause} className={styles.button}>
              <i className="material-icons">pause</i>
            </button>
          ) : (
            <button onClick={onPlay} className={styles.button}>
              <i className="material-icons">play_arrow</i>
            </button>
          )
        }
      </div>
      <div>
        <button onClick={onPlayNext} className={`${styles.button} ${styles.buttonSmall}`}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      <div>
        <button onClick={onOpenPlayList}>
          <i className="material-icons">format_list_numbered</i>
        </button>
      </div>
    </div>
  );
}
