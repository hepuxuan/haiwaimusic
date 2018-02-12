import React from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Mainnav';
import BottomNav from '../components/BottomNav';
import SongListShell from './components/SongListShell';

@inject('store') @observer
export default class Shell extends React.Component {
  componentDidMount() {
    Promise.all([
      this.props.store.fetchNewSongList('mainland'),
      this.props.store.fetchTopSongList('mainland'),
      this.props.store.fetchPlayList(),
    ]).then(() => {
      // browserHistory.replace('/');
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar />
          <BottomNav activeLink="home" />
          <div className="main-body">
            <SongListShell />
            <SongListShell />
            <SongListShell />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
