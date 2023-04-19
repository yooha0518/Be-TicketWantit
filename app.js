const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const mongoose = require('mongoose');
const env = require('./.env')

// const indexRouter = require('./routes');
// const postsRouter = require('./routes/posts');
const apiRouter = require('./routers');


// 1. mongoose.connect()를 사용해서 mongodb 데이터베이스를 연결하세요.
mongoose.connect(env.MONGO_URI)

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

const app = express();


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/posts', postsRouter);

app.use('/api',apiRouter);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
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

