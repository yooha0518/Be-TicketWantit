const { Router } = require('express');
const router = Router();
const userRouter = require('./user');
const authRouter = require('./auth');
const orderRouter = require('./order');
const productRouter = require('./product');
const adminRouter = require('./admin');
router.get('/', (req, res) => {
	console.log('api 라우터 테스트');
	res.send('this is homepage');
});
router.use('/user', userRouter);

router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/product', productRouter);


module.exports = router;
