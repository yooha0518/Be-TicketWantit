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

//MD추천
router.get('/MD_Pick', productController.getMDPick);

//------------------------ADMIN------------------
//ADMIN 상품 추가
router.post('/admin/add', productController.postProduct);
//ADMIN 상품 삭제
router.delete('/admin/delete', productController.delProduct);
//ADMIN 상품 전체 삭제
router.delete('/admin/delete/all', productController.delAllProduct);

module.exports = router;
