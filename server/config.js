const config = {
  clientID: '157303522919-h723lothrlfk6k3c4uk2sspljqkpf5g9.apps.googleusercontent.com',
  clientSecret: '-cFnN_adTvQz3FtAD9LEctZJ',
  secret: '=CsZwA<_,Jxm9^7"',
};

// if (process.env.NODE_ENV === 'production') {
//   config.callbackURL = 'http://www.yinyuetai.fun/auth/google/return';
// } else {
//   config.callbackURL = 'http://localhost:8080/auth/google/return';
// }

config.callbackURL = 'http://www.yinyuetai.fun/auth/google/return';

module.exports = config;
