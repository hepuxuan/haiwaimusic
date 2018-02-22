import React from 'react';
import { inject, observer } from 'mobx-react';
import { runInAction } from 'mobx';
import PlayList from './components/PlayList';
import AudioPlayback from '../components/AudioPlayback';
import './scss/index.scss';

@inject('store') @observer
export default class Index extends React.Component {
  componentWillMount() {
    runInAction(() => {
      this.props.store.isIndex = false;
      this.props.store.title = '播放列表';
      this.props.store.showNav = true;
      this.props.store.path = '/playList';
    });
  }

  render() {
    return (
      <div className="main-body with-play-back">
        <PlayList />
        <AudioPlayback />
      </div>
    );
  }
}
