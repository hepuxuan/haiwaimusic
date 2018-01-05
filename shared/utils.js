import filter from 'lodash/filter';

function getPlayList() {
  let playList = [];
  if (typeof localStorage !== 'undefined') {
    const playListString = localStorage.getItem('playList');
    playList = playListString ? JSON.parse(playListString) : [];
  }
  return filter(playList, item => !!item.mid);
}

function addToPlayList(song) {
  if (__SERVER__DATA__.user) {
    fetch('/user/playList', {
      body: JSON.stringify(song),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else if (typeof localStorage !== 'undefined') {
    localStorage.setItem('playList', JSON.stringify(getPlayList().concat(song)));
  }
}

function getQueryVariable(search, variable) {
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

function removeFromPlayList(mid) {
  if (__SERVER__DATA__.user) {
    fetch(`/user/playList/${mid}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('playList', JSON.stringify(filter(getPlayList(), song => song.mid !== mid)));
  }
}

function getSearchHistory() {
  let searchHistory = [];
  if (typeof localStorage !== 'undefined') {
    const searchHistoryString = localStorage.getItem('searchHistory');
    searchHistory = searchHistoryString ? JSON.parse(searchHistoryString) : [];
  }

  return searchHistory;
}

function updateHistory(list) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('searchHistory', JSON.stringify(list));
  }
}

function jsonp(url, cb) {
  window.JsonCallback = cb;
  const tag = document.createElement('script');
  tag.charset = 'GBK';
  tag.src = url;
  document.getElementsByTagName('head')[0].appendChild(tag);
}

function toFixed2(num) {
  return num < 10 ? `0${num}` : num;
}

function formatTime(seconds) {
  return `${toFixed2(Math.floor(seconds / 60))}:${toFixed2(Math.round((seconds % 60)))}`;
}

function goto(url) {
  window.history.pushState({}, document.title, url);
  ga('send', 'pageview', url);
}

export { getPlayList, getSearchHistory, updateHistory, getQueryVariable,
  jsonp, formatTime, goto, addToPlayList, removeFromPlayList };
