import { action, computed, extendObservable } from 'mobx';
import find from 'lodash/find';
import { removeFromPlayList, addToPlayList } from './utils';

export default class Store {
  constructor({
    user, playList, song, isPaused = false, isStopped = true,
    loop = false, renderAudio = false, duration = null, current = 0,
  }) {
    extendObservable(this, {
      user, playList, song, isPaused, isStopped, loop, renderAudio, duration, current,
    });
  }

  @action.bound setDuration(duration) {
    this.duration = duration;
  }

  @action.bound toggleLoop() {
    this.loop = !this.loop;
  }

  @computed get isPlaying() {
    return !this.isPaused && !this.isStopped;
  }

  @action.bound play() {
    this.isStopped = false;
    this.isPaused = false;
    if (this.audio) {
      this.audio.play();
    }
  }

  @action.bound replay() {
    this.current = 0;
    this.isStopped = false;
    this.isPaused = false;
    if (this.audio) {
      this.audio.play();
    }
  }

  @action.bound pause() {
    this.isPaused = true;
    this.isStopped = false;
    if (this.audio) {
      this.audio.pause();
    }
  }

  @action.bound removeSong(mid) {
    const song = this.playList.find(({ mid: _mid }) => _mid === mid);
    this.playList.remove(song);
    removeFromPlayList(mid);
  }

  @action.bound setSong(song) {
    this.song = song;
  }

  @action.bound addToList(song) {
    if (find(this.playList, ({ songId }) => songId === song.songId)) {
      return;
    }
    this.playList.push(song);
    addToPlayList(song);
  }

  @action fetchSongInfo(mid) {
    if (this.song && this.song.mid === mid) {
      return Promise.resolve();
    }
    this.current = 0;
    return fetch(`/api/qqmusic/song/${mid}`)
      .then(res => res.json())
      .then((song) => {
        this.setSong(song);
      });
  }
}
