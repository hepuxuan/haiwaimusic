import React from 'react';
import { inject, observer } from 'mobx-react';
import ProgressBar from './ProgressBar';
import styles from '../scss/controlPanel.scss';

function handlePlay(audio) {
  if (audio) {
    audio.play();
  }
}

function ControlPanel({
  store: {
    duration, current, toggleLoop, loop, isPlaying, handleForward, pause, audio,
  },
  onPlayNext, onPlayPrev, onOpenPlayList,
}) {
  return (
    <div className={styles.root}>
      <ProgressBar duration={duration} current={current} onForward={handleForward} />
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
              <button onClick={pause} className={styles.button}>
                <i className="material-icons">pause</i>
              </button>
            ) : (
              <button onClick={() => { handlePlay(audio); }} className={styles.button}>
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
