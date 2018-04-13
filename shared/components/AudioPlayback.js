import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styles from './audioPlayback.scss';

@inject('store')
@observer
class AudioPlayback extends React.Component {
  render() {
    const { song, isPlaying } = this.props.store;
    if (song) {
      const imageUrl = `//imgcache.qq.com/music/photo/album_300/${song.imageId %
        100}/300_albumpic_${song.imageId}_0.jpg`;
      return (
        <Link to={`/song?song=${song.song}&mid=${song.mid}`}>
          <div className={styles.playbackRoot}>
            <div className={styles.songDetails}>
              <img
                className={`${styles.songImage} ${isPlaying ? styles.rotateImage : ''}`}
                width="35"
                height="35"
                src={imageUrl}
                alt={song.song}
              />
              <div>
                <div className={styles.songName}>{song.song}</div>
                <div className={styles.singer}>{song.singer}</div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return <div />;
  }
}
export default AudioPlayback;
