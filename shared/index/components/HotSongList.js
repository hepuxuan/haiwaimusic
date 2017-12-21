import React from 'react';
import styles from '../scss/hotSongList.scss';

export default function ({ songs, title, tabs }) {
  return (
    <div className={styles.hotSongs}>
      {!!songs.length && (
        <React.Fragment>
          <div className={styles.title}>{title}</div>
          {tabs || null}
        </React.Fragment>
      )}

      <div className={styles.srollable}>
        {
          songs.slice(0, 10).map(({
           songId, song, singer, imageId, mid,
         }) => {
           const url = `http://imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
           return (
             <div key={songId}>
               <a href={`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}&mid=${mid}`}>
                 <img width="100%" src={url} alt="" />
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
