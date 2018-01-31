import { action, computed, extendObservable, observable } from 'mobx';
import find from 'lodash/find';
import { removeFromPlayList, addToPlayList } from './utils';
import Lrc from './Lrc';

export default class Store {
  constructor({
    user, playList, song, isPaused = false, isStopped = true,
    loop = false, renderAudio = false, duration = null, current = 0, newSongs = {}, topSongs = {},
  }) {
    const newSongsMap = observable.map({
      mainland: newSongs.mainland || [],
      hktw: newSongs.hktw || [],
      euna: newSongs.euna || [],
    });
    const topSongsMap = observable.map({
      mainland: topSongs.mainland || [],
      hktw: topSongs.hktw || [],
      euna: topSongs.euna || [],
    });

    extendObservable(this, {
      user,
      playList,
      song,
      isPaused,
      isStopped,
      loop,
      renderAudio,
      duration,
      current,
      newSongsMap,
      topSongsMap,
      lyric: '',
      currentLine: '',
      loaded: false,
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
    const { isPaused } = this;
    this.isStopped = false;
    this.isPaused = false;
    if (this.audio) {
      this.audio.play();
      if (this.lyric && this.loaded) {
        if (isPaused) {
          this.lyric.pauseToggle();
        } else {
          this.lyric.play();
        }
      }
    }
  }

  @action.bound handleLoadAudio() {
    this.loaded = true;
    if (this.isPlaying && this.lyric) {
      this.lyric.play();
    }
  }

  @action.bound replay() {
    this.current = 0;
    this.play();
  }

  @action.bound stop() {
    this.current = 0;
    this.isPaused = false;
    this.isStopped = true;
    if (this.lyric) {
      this.lyric.stop();
    }
  }

  @action.bound pause() {
    this.isPaused = true;
    this.isStopped = false;
    if (this.audio) {
      this.audio.pause();
      if (this.lyric) {
        this.lyric.pauseToggle();
      }
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

  @action.bound setNewSongs(songs, type) {
    this.newSongsMap.set(type, songs);
  }

  @action.bound setTopSongs(songs, type) {
    this.topSongsMap.set(type, songs);
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
  @action resetTimmer() {
    this.current = this.audio.currentTime;
  }

  @action.bound handleForward(current) {
    const diff = current - this.current;
    this.current = current;
    this.audio.currentTime = current;
    if (this.lyric) {
      this.lyric.seek(diff * 1000);
    }
  }

  @action.bound handleOutput(currentLine) {
    this.currentLine = currentLine;
  }

  fetchNewSongList(type) {
    if (this.newSongsMap.get(type).length) {
      return Promise.resolve(this.newSongsMap.get(type));
    }
    return fetch(`/api/qqmusic/newSongs?type=${type}`)
      .then(res => res.json())
      .then((songs) => {
        this.setNewSongs(songs.songs, type);
      });
  }

  fetchTopSongList(type) {
    if (this.topSongsMap.get(type).length) {
      return Promise.resolve(this.newSongsMap.get(type));
    }
    return fetch(`/api/qqmusic/topSongs?type=${type}`)
      .then(res => res.json())
      .then((songs) => {
        this.setTopSongs(songs.songs, type);
      });
  }

  fetchLyric = () => {
    if (this.lyric) {
      this.lyric.handler = () => {};
    }
    const url = `/api/qqmusic/lyric?songId=${this.song.songId}`;
    fetch(url).then(res => res.json()).then(action(({ lyric: _lyric }) => {
      this.lyric = new Lrc(_lyric, this.handleOutput);
      if (this.isPlaying) {
        this.lyric.play();
        this.lyric.seek(this.current * 1000);
      }
    })).catch(action(() => {
      this.lyric = null;
    }));
  }
}
