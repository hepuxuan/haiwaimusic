import React from 'react';
import styles from '../scss/hotSongList.scss';

export default function ({ songs }) {
  return (
    <div className={styles.hotSongs}>
      { !!songs.length && <div className={styles.title}>热门歌曲</div> }
      {
        songs.map(({
         id, songName, singerName, albumId,
       }) => (
         <div key={id}>
           <a href={`/song/${singerName}?singer=${singerName}&songId=${id}&imageId=${albumId}`}>
             <span>{songName}</span>&nbsp;-&nbsp;
             <span className={styles.singerName}>{singerName}</span>
           </a>
         </div>
       ))
      }
    </div>
  );
}
