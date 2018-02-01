import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
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
               <Link to={`/song/${song}?&mid=${mid}`}>
                 <div className={styles.imageBox}>
                   <LazyLoad>
                     <img width="100%" src={url} alt="" />
                   </LazyLoad>
                 </div>
                 <div>
                   <div className={styles.songName}>{song}</div>
                   <div className={styles.singerName}>{singer}</div>
                 </div>
               </Link>
             </div>
           );
         })
        }
      </div>
    </div>
  );
}
