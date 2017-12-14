function getPlayList() {
  let playList = [];
  if (typeof localStorage !== 'undefined') {
    const playListString = localStorage.getItem('playList');
    playList = playListString ? JSON.parse(playListString) : [];
  }
  return playList;
}

function updatePlayList(list) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('playList', JSON.stringify(list));
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

export { getPlayList, updatePlayList, getSearchHistory, updateHistory, jsonp };
