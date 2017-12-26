import React from 'react';
import Navbar from '../../components/Navbar';
import PlayList from './PlayList';
import BottomNav from '../../components/BottomNav';
import { getPlayList, removeFromPlayList } from '../../utils';
import '../scss/index.scss';

function Index({ playList, onRemoveSong, user }) {
  return (
    <React.Fragment>
      <div className="page-body">
        <Navbar title="播放列表" user={user} />
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
      playList: this.props.playList.concat(getPlayList()),
    });
  }

  handleRemoveSong = (mid) => {
    const playList = this.state.playList.filter(({ mid: _mid }) => _mid !== mid);
    setTimeout(() => {
      this.setState({
        playList,
      });
    }, 500);
    removeFromPlayList(mid);
  }

  render() {
    return <Index playList={this.state.playList} onRemoveSong={this.handleRemoveSong} user={this.props.user} />;
  }
}
