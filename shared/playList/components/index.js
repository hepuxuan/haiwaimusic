import React from 'react';
import Nav from './Nav';
import PlayList from './PlayList';
import BottomNav from '../../components/BottomNav';
import { getPlayList, updatePlayList } from '../../utils';
import '../scss/index.scss';

function Index({ playList, onRemoveSong }) {
  return (
    <React.Fragment>
      <Nav />
      <PlayList playList={playList} onRemoveSong={onRemoveSong} />
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

  handleRemoveSong = (id) => {
    const playList = this.state.playList.filter(({ songId }) => songId !== id);
    this.setState({
      playList,
    });
    updatePlayList(playList);
  }

  render() {
    return <Index playList={this.state.playList} onRemoveSong={this.handleRemoveSong} />;
  }
}
