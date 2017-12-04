import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import Description from './Description';
import Nav from './Nav';
import Player from './Player';
import BottomNav from '../../components/BottomNav';
import '../scss/index.scss';
import { getPlayList, updatePlayList } from '../../utils';

function Index({
  songId, song, singer, imageId, lyric, onAddToPlayList, onPlayNext, onPlayPrev,
}) {
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
      <BottomNav />
    </React.Fragment>
  );
}

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      lyric: null,
      playList: getPlayList(),
    };
  }

  componentDidMount() {
    const url = `/api/qqmusic/lyric?songId=${this.props.songId}`;
    fetch(url).then(res => res.json()).then(({ lyric }) => {
      this.setState({
        lyric,
      });
    });
  }

  handleAddToPlayList = () => {
    const {
      songId, song, singer, imageId,
    } = this.props;
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
        ({ songId: existingSongId }) => existingSongId === this.props.songId,
      );
      const nextIndex = (index + 1) % playList.length;
      const {
        songId, song, singer, imageId,
      } = playList[nextIndex];
      window.location.replace(`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`);
    }
  }

  handlePlayPrev = () => {
    const { playList } = this.state;
    if (playList.length) {
      const index = findIndex(
        playList,
        ({ songId: existingSongId }) => existingSongId === this.props.songId,
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
      window.location.replace(`/song/${song}?singer=${singer}&songId=${songId}&imageId=${imageId}`);
    }
  }

  render() {
    const { lyric, playList } = this.state;

    return (
      <Index
        {...this.props}
        lyric={lyric}
        playList={playList}
        onAddToPlayList={this.handleAddToPlayList}
        onPlayNext={this.handlePlayNext}
        onPlayPrev={this.handlePlayPrev}
      />
    );
  }
}
