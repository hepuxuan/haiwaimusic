const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./build/index');
const song = require('./build/song');
const playList = require('./build/playList');
const qqApi = require('./routes/qqApi');
const search = require('./build/search');

const app = express();

const content = fs.readFileSync(path.resolve(__dirname, './stats.generated.json'));
const hash = JSON.parse(content).hash;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const oneYear = 86400000 * 365;
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: oneYear,
}));

app.use((req, res, next) => {
  req.hash = hash;
  next();
});

app.use('/', index);
app.use('/song', song);
app.use('/playList', playList);
app.use('/search', search);
app.use('/api/qqmusic', qqApi);


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
