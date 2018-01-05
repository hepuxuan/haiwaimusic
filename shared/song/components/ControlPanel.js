import React from 'react';
import { inject, observer } from 'mobx-react';
import { formatTime } from '../../utils';
import styles from '../scss/controlPanel.scss';

function ControlPanel({
  onPause, onPlay, store: {
    duration, current, toggleLoop, loop, isPlaying,
  },
  onPlayNext, onPlayPrev, onOpenPlayList,
}) {
  const progress = duration ? (current / duration) * 100 : 0;
  return (
    <div className={styles.root}>
      <div className={styles.playerStats}>
        <div className={styles.time}>{formatTime(current)}</div>
        <div className={styles.progressBar}>
          <div className={styles.background} />
          <div style={{ width: `${progress}%` }} className={styles.progress} />
        </div>
        <div className={styles.time}>{formatTime(duration)}</div>
      </div>
      <div className={styles.buttonsGroup}>
        <div>
          <button onClick={toggleLoop}>
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
    </div>
  );
}

export default inject('store')(observer(ControlPanel));
