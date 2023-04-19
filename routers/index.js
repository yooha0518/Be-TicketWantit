const { Router } = require('express');
const router = Router();
const loginRequired = require('../middlewares/index');
const userRouter = require('./user');
const loginRouter = require('./login');
const orderRouter = require('./order');
const productRouter = require('./product');

router.get('/', (req, res) => {
  res.send('this is homepage');
});
router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/orders', orderRouter);
router.use('/product', productRouter);

// router.use('/결제', (req, res) => {
// 	if (req.user) {
// 		res.redirect('/결제완료'); // 로그인 된 경우 /posts로
// 		return;
// 	}
// 	res.redirect('/login'); // 로그인 되지 않은 경우 /login 으로
// });

router.use('./user', userRouter);
router.use('./product', productRouter);

module.exports = router;
