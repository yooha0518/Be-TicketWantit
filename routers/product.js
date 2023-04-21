const { Router } = require('express');
const router = Router();
const { productController } = require('../controller');

//상품 전체
router.get('/', productController.getProduct);

//상품 카테고리별
router.get('/category', productController.getCategoryProduct);

//상품 상세
router.get('/detail', productController.getDetail);

//thumbnail
// router.get('/thumbnail', productController);

//NEW ARRIVALS
router.get('/new_arrivals', productController.getNewArrivals);

//MD추천
router.get('/MD_Pick', productController.getMDPick);

module.exports = router;
