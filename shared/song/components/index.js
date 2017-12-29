import React from 'react';
import find from 'lodash/find';
import 'isomorphic-fetch';
import findIndex from 'lodash/findIndex';
import Description from './Description';
import Nav from './Nav';
import Player from './Player';
import PlayList from './PlayList';
import styles from '../scss/index.scss';
import { getPlayList, addToPlayList } from '../../utils';

function Index({
  songId, song, singer, imageId, lyric, onOpenPlayList, onClosePlayList,
  onAddToPlayList, onPlayNext, onPlayPrev, playList, isPlayListOpen, songUrl,
}) {
  const imageUrl = `//imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
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
        onOpenPlayList={onOpenPlayList}
        songUrl={songUrl}
      />
      <PlayList
        playList={playList}
        isPlayListOpen={isPlayListOpen}
        onClosePlayList={onClosePlayList}
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
      playList: this.props.playList.concat(getPlayList()),
      isPlayListOpen: false,
    };
  }

  componentDidMount() {
    this.fetchLyric();
  }

  fetchLyric = () => {
    const url = `/api/qqmusic/lyric?songId=${this.props.songId}`;
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
      songId, song, singer, imageId, mid,
    } = this.props;
    const { playList } = this.state;

    if (find(playList, ({ songId: existingSongId }) => existingSongId === songId)) {
      return;
    }

    const newSong = {
      songId, song, singer, imageId, mid,
    };

    const newList = playList.concat(newSong);
    addToPlayList(newSong);
    this.setState({
      playList: newList,
    });
  }

  handlePlayNext = () => {
    const { playList } = this.state;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) => existingSongId.toString() === this.props.songId.toString(),
      );
      const nextIndex = (index + 1) % playList.length;
      const {
        song, mid,
      } = playList[nextIndex];
      window.location.assign(`/song/${song}?&mid=${mid}`);
    }
  }

  handlePlayPrev = () => {
    const { playList } = this.state;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) => existingSongId.toString() === this.props.songId.toString(),
      );
      let nextIndex;
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = playList.length - 1;
      }
      const {
        song, mid,
      } = playList[nextIndex];
      window.location.assign(`/song/${song}?&mid=${mid}`);
    }
  }

  handleOpenPlayList = () => {
    this.setState({
      isPlayListOpen: true,
    });
  }

  handleClosePlayList = () => {
    this.setState({
      isPlayListOpen: false,
    });
  }

  render() {
    const {
      lyric, playList, isPlayListOpen,
    } = this.state;

    const {
      songId, song, singer, imageId,
    } = this.props;

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
        isPlayListOpen={isPlayListOpen}
        onOpenPlayList={this.handleOpenPlayList}
        onClosePlayList={this.handleClosePlayList}
        songUrl={this.props.songUrl}
      />
    );
  }
}
