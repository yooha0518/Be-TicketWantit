const { Router } = require('express');
const router = Router();
const { Product } = require('../models');
const { productController } = require('../controller');

//상품 전체
router.get('/', productController.getProduct);
//상품 카테고리별
router.get('/category', productController.getCategory);
//상품 상세
router.get('/detail', productController.getDetail);
//thumbnail
// router.get('/thumbnail', productController);
//NEW ARRIVALS
router.get('/new_arrivals', productController.getNewArrivals);

//------------------------ADMIN------------------
//ADMIN 상품 추가
router.post('/', productController.postProduct);

module.exports = router;
