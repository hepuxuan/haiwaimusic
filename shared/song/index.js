import React from 'react';
import { inject, observer } from 'mobx-react';
import { runInAction } from 'mobx';
import Description from './components/Description';
import Nav from './components/Nav';
import Player from './components/Player';
import PlayList from './components/PlayList';
import styles from './scss/index.scss';
import { getQueryVariable } from '../utils';

@inject('store') @observer
export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlayListOpen: false,
    };

    runInAction('navigation', () => {
      props.store.isIndex = false;
      props.store.title = '';
      props.store.showNav = false;
      props.store.path = '/song';
    });
  }

  componentDidMount() {
    const mid = getQueryVariable(this.props.location.search, 'mid');
    this.props.store.fetchSongInfo(mid).then(this.props.store.fetchLyric);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      const mid = getQueryVariable(nextProps.location.search, 'mid');
      this.props.store.loaded = false;
      this.props.store.fetchSongInfo(mid).then(this.props.store.fetchLyric);
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

  handleAddToList = () => {
    this.props.store.addToList(this.props.store.song);
  }

  render() {
    const { isPlayListOpen } = this.state;

    return (
      <div>
        <Nav handleAddToPlayList={this.handleAddToList} />
        {
          (() => {
            if (!this.props.store.song) {
              return null;
            }

            const {
              song, singer, imageId,
            } = this.props.store.song;

            const imageUrl = `//imgcache.qq.com/music/photo/album_300/${imageId % 100}/300_albumpic_${imageId}_0.jpg`;
            return (
              <React.Fragment>
                <Description song={song} singer={singer} />
                <Player onOpenPlayList={this.handleOpenPlayList} />
                <PlayList
                  isPlayListOpen={isPlayListOpen}
                  onClosePlayList={this.handleClosePlayList}
                />
                <div className={styles.background} style={{ backgroundImage: `url(${imageUrl})` }} />
              </React.Fragment>
            );
          })()
        }
      </div>
    );
  }
}
