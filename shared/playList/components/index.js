import React from 'react';
import Navbar from '../../components/Navbar';
import PlayList from './PlayList';
import BottomNav from '../../components/BottomNav';
import { getPlayList, updatePlayList } from '../../utils';
import '../scss/index.scss';

function Index({ playList, onRemoveSong }) {
  return (
    <React.Fragment>
      <div className="page-body">
        <Navbar title="播放列表" />
        <div className="main-body">
          <PlayList playList={playList} onRemoveSong={onRemoveSong} />
        </div>
      </div>
      <BottomNav activeLink="playList" />
    </React.Fragment>
  );
}

export default class IndexContainer extends React.Component {
  state = {
    playList: [],
  }
  componentDidMount() {
    this.setState({
      playList: getPlayList(),
    });
  }

  handleRemoveSong = (_songId) => {
    const playList = this.state.playList.filter(({ songId }) => songId !== _songId);
    setTimeout(() => {
      this.setState({
        playList,
      });
    }, 500);
    updatePlayList(playList);
  }

  render() {
    return <Index playList={this.state.playList} onRemoveSong={this.handleRemoveSong} />;
  }
}
