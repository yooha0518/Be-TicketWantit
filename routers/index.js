const { Router } = require('express');
const router = Router();
const userRouter = require('./user');
const authRouter = require('./auth');
const orderRouter = require('./order');
const productRouter = require('./product');
const adminProductRouter = require('./adminProduct');
const adminCategoryRouter = require('./adminCategory');
const adminOrderRouter = require('./adminOrder');
const getUserFromJwt = require('../middlewares/getUserFromJwt');

router.get('/', (req, res) => {
  console.log('api 라우터 테스트');
  res.send('this is homepage');
});
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/orders', getUserFromJwt, orderRouter);
router.use('/product', productRouter);
router.use('/admin_product', getUserFromJwt, adminProductRouter);
router.use('/admin_category', getUserFromJwt, adminCategoryRouter);
router.use('/adminOrder', getUserFromJwt, adminOrderRouter);

module.exports = router;
