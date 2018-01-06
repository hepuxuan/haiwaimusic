import React from 'react';
import Navbar from '../components/Navbar';
import PlayList from './components/PlayList';
import BottomNav from '../components/BottomNav';
import AudioPlayback from '../components/AudioPlayback';
import './scss/index.scss';

export default function Index() {
  return (
    <React.Fragment>
      <div className="page-body">
        <Navbar title="播放列表" />
        <BottomNav activeLink="playList" />
        <div className="main-body with-play-back">
          <PlayList />
          <AudioPlayback />
        </div>
      </div>
    </React.Fragment>
  );
}
