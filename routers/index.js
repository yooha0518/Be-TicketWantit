const { Router } = require('express');
const router = Router();
const loginRequired = require('../middlewares/index');
const userRouter = require('./user');
const authRouter = require('./auth');
const orderRouter = require('./order');
const productRouter = require('./product');
const adminRouter = require('./admin');
router.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('this is homepage');
=======
	res.send('this is homepage');
>>>>>>> d0bc6d8e38b3f1b9af9c68bbd429cb13ba71ed6b
});
router.use('/user', userRouter);
//로그인 페이지 랜더링
// router.get('/login', (req, res, next) => {
// 	res.render('login');
// });
router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/product', productRouter);
router.use('/admin', adminRouter);

// router.use('/결제', (req, res) => {
// 	if (req.user) {
// 		res.redirect('/결제완료'); // 로그인 된 경우 /posts로
// 		return;
// 	}
// 	res.redirect('/login'); // 로그인 되지 않은 경우 /login 으로
// });

<<<<<<< HEAD
router.use('./user', userRouter);
=======
>>>>>>> d0bc6d8e38b3f1b9af9c68bbd429cb13ba71ed6b

module.exports = router;
