const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const env = require('./.env');

//routers
const indexRouter = require('./routers');
const orderRouter = require('./routers/order');
const apiRouter = require('./routers');

//서버연결
app.listen(env.PORT, (err) => {
	if(err){ 
        console.log(`서벼 연결 실패 : ${err}`);
    }else{
        console.log(`서버 연결 성공`);
    }
})

//db연결
mongoose.connect(env.MONGO_URI);

mongoose.connection.on('connected', () => {
	console.log('MongoDB Connected');
});

mongoose.connection.on('disconnected',(err)=>{
    if(err){
        console.log(`MongoDB 연결중 에러 발생: ` +err)
    }
    console.log('MongoDB disconnected')
    console.log('byebye')
}); 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
// 애플리케이션 수준 미들웨어
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
app.use(express.static('public')); // 정적 파일 서비스
});
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

//routes
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

app.listen(env.PORT, () => {
	console.log(PORT, '서버가 실행되었습니다~!');
});
