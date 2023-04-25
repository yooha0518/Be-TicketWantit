const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
//const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const env = require('./.env');
const getUserFromJwt = require('./middlewares/getUserFromJwt');
const app = express();

//routers
const apiRouter = require('./routers');

//db연결
mongoose.connect(env.MONGO_URI);

mongoose.connection.on('connected', () => {
	console.log('MongoDB Connected');
});

mongoose.connection.on('disconnected', (err) => {
	if (err) {
		console.log(`MongoDB 연결중 에러 발생: ` + err);
	}
	console.log('MongoDB disconnected');
	console.log('byebye');
});
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
  });
  

require('./passport')();
// 애플리케이션 수준 미들웨어
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
app.use(express.static('public')); // 정적 파일 서비스

// app.use(logger('dev'));

//app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//    session({
//       secret: 'secret',
//       resave: false,
//       saveUninitialized: true,
//    })
// );

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(passport.initialize());
app.use(cors(corsOptions));
app.use('/api', apiRouter);

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

app.get('/', (req, res) => {
  res.send('this is HOME PAGE');
});

//서버연결
app.listen(env.PORT, (err) => {
  if (err) {
    console.log(`서버 연결 실패 : ${err}`);
  } else {
    console.log(`${env.PORT}서버 연결 성공`);
  }
});