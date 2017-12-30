import React from 'react';
import LazyLoad from 'react-lazy-load';
import styles from '../scss/hotSongList.scss';

export default function ({ songs, title, tabs }) {
  return (
    <div className={styles.hotSongs}>
      <React.Fragment>
        <div className={styles.title}>{title}</div>
        {tabs || null}
      </React.Fragment>

      <div className={styles.srollable}>
        {
          songs.map(({
           songId, song, singer, imageId, mid,
         }) => {
           const url = `//imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
           return (
             <div key={songId}>
               <a href={`/song/${song}?&mid=${mid}`}>
                 <LazyLoad>
                   <img width="100%" src={url} alt="" />
                 </LazyLoad>
                 <div>
                   <div className={styles.songName}>{song}</div>
                   <div className={styles.singerName}>{singer}</div>
                 </div>
               </a>
             </div>
           );
         })
        }
      </div>
    </div>
  );
}
