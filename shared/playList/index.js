import React from 'react';
import Navbar from '../components/Navbar';
import PlayList from './components/PlayList';
import BottomNav from '../components/BottomNav';
import './scss/index.scss';

export default function Index() {
  return (
    <React.Fragment>
      <div className="page-body">
        <Navbar title="播放列表" />
        <BottomNav activeLink="playList" />
        <div className="main-body">
          <PlayList />
        </div>
      </div>
    </React.Fragment>
  );
}
