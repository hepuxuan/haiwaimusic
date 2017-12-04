// precompile in production?
require('babel-register')({
  presets: ['react'],
  ignore: 'node_modules',
  plugins: [
    [
      'css-modules-transform', {
        preprocessCss: './server/loaders/sass-loader.js',
        generateScopedName: '[hash:8]',
        extensions: ['.scss'],
      },
    ],
  ],
});

const express = require('express');
const path = require('path');
const compression = require('compression');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const song = require('./routes/song');
const playList = require('./routes/playList');
const qqApi = require('./routes/qqApi');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/song', song);
app.use('/playList', playList);
app.use('/api/qqmusic', qqApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
