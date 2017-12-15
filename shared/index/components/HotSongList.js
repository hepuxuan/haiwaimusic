import React from 'react';
import styles from '../scss/hotSongList.scss';

export default function ({ songs, title }) {
  return (
    <div className={styles.hotSongs}>
      { !!songs.length && <div className={styles.title}>{title}</div> }
      <div className={styles.srollable}>
        {
          songs.slice(0, 10).map(({
           id, songName, singerName, albumId,
         }) => {
           const url = `http://imgcache.qq.com/music/photo/album_300/${albumId % 100}/300_albumpic_${albumId}_0.jpg`;
           return (
             <div key={id}>
               <a href={`/song/${songName}?singer=${singerName}&songId=${id}&imageId=${albumId}`}>
                 <img width="100%" src={url} alt="" />
                 <div>
                   <div>{songName}</div>
                   <div className={styles.singerName}>{singerName}</div>
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
