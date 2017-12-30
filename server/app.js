const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const index = require('./build/index');
const song = require('./build/song');
const playList = require('./build/playList');
const qqApi = require('./routes/qqApi');
const auth = require('./routes/auth');
const user = require('./routes/user');
const search = require('./build/search');
const config = require('./config');
const userService = require('./services/user');

const app = express();

const content = fs.readFileSync(path.resolve(__dirname, './stats.generated.json'));
const hash = JSON.parse(content).hash;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());
// app.use(bodyParser.urlencoded({ extended: true }));

const oneYear = 86400000 * 365;
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: oneYear,
}));

const client = redis.createClient();
app.use(session({
  store: new RedisStore({
    client,
  }),
  secret: config.secret,
  saveUninitialized: false,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.hash = hash;
  next();
});

passport.use(new GoogleStrategy(
  {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
  },
  ((token, tokenSecret, profile, done) => {
    const user = {
      uuid: profile.id,
      name: profile.displayName,
      email: profile.email,
      imageUrl: profile.photos[0].value,
    };
    userService.createOrUpdate(user).then(() => {
      done(null, user);
    });
  }),
));

passport.serializeUser((_user, done) => {
  done(null, _user);
});

passport.deserializeUser((_user, done) => {
  done(null, _user);
});

app.use('/', index);
app.use('/song', song);
app.use('/playList', playList);
app.use('/search', search);
app.use('/api/qqmusic', qqApi);
app.use('/auth', auth);
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
