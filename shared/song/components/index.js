import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import Description from './Description';
import Nav from './Nav';
import Player from './Player';
import styles from '../scss/index.scss';
import { getPlayList, updatePlayList } from '../../utils';

function Index({
  songId, song, singer, imageId, lyric, onAddToPlayList, onPlayNext, onPlayPrev,
}) {
  const imageUrl = `http://imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
  return (
    <React.Fragment>
      <Nav handleAddToPlayList={onAddToPlayList} />
      <Description song={song} singer={singer} />
      <Player
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        songId={songId}
        imageId={imageId}
        lyric={lyric}
      />
      <div className={styles.background} style={{ backgroundImage: `url(${imageUrl})` }} />
    </React.Fragment>
  );
}

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lyric: null,
      playList: getPlayList(),
      songId: props.songId,
      song: props.song,
      singer: props.singer,
      imageId: props.imageId,
    };
  }

  componentDidMount() {
    this.fetchLyric();
  }

  fetchLyric = () => {
    const url = `/api/qqmusic/lyric?songId=${this.state.songId}`;
    fetch(url).then(res => res.json()).then(({ lyric }) => {
      this.setState({
        lyric,
      });
    }).catch(() => {
      this.setState({
        lyric: null,
      });
    });
  }

  handleAddToPlayList = () => {
    const {
      songId, song, singer, imageId,
    } = this.state;
    const { playList } = this.state;

    if (find(playList, ({ songId: existingSongId }) => existingSongId === songId)) {
      return;
    }

    const newList = playList.concat({
      songId, song, singer, imageId,
    });
    updatePlayList(newList);
    this.setState({
      playList: newList,
    });
  }

  handlePlayNext = () => {
    const { playList } = this.state;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) => existingSongId === this.state.songId,
      );
      const nextIndex = (index + 1) % playList.length;
      const {
        songId, song, singer, imageId,
      } = playList[nextIndex];

      this.setState({
        songId, song, singer, imageId, lyric: null,
      }, this.fetchLyric);
      window.history.pushState('playSong', document.title, `/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`);
    }
  }

  handlePlayPrev = () => {
    const { playList } = this.state;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) => existingSongId === this.state.songId,
      );
      let nextIndex;
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = playList.length - 1;
      }
      const {
        songId, song, singer, imageId,
      } = playList[nextIndex];

      this.setState({
        songId, song, singer, imageId, lyric: null,
      }, this.fetchLyric);
      window.history.pushState('playSong', document.title, `/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`);
    }
  }

  render() {
    const {
      lyric, playList, songId, song, singer, imageId,
    } = this.state;

    return (
      <Index
        songId={songId}
        song={song}
        singer={singer}
        imageId={imageId}
        lyric={lyric}
        playList={playList}
        onAddToPlayList={this.handleAddToPlayList}
        onPlayNext={this.handlePlayNext}
        onPlayPrev={this.handlePlayPrev}
      />
    );
  }
}
