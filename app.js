const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const env = require('./.env');

//routers
const indexRouter = require('./routers');
const orderRouter = require('./routers/order');

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

mongoose.connection.on('connected', (err) => {
    if(err){
        console.log('MongoDB 연결중 에러 발생: ' + err );
    }  
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

//routes
app.use('/', indexRouter);
app.use('/orders', orderRouter);

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

