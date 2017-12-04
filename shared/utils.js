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

export { getPlayList, updatePlayList };
