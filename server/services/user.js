const fetch = require('isomorphic-fetch');

module.exports = {
  async createOrUpdate(user) {
    const res = await fetch('http://localhost:8081/users', {
      body: JSON.stringify(user),
      method: 'POST',
    });

    return res.ok;
  },
  async getPlayList(uuid) {
    const res = await fetch(`http://localhost:8081/users/${uuid}/playList`);
    return res.json();
  },

  async addToPlayList(uuid, song) {
    const res = await fetch(`http://localhost:8081/users/${uuid}/playList`, {
      body: JSON.stringify(song),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  },

  async removeFromPlayList(uuid, songId) {
    const res = await fetch(`http://localhost:8081/users/${uuid}/playList/${songId}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};
