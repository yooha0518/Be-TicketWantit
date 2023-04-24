const multer = require('multer');
const { Router } = require('express');
const router = Router();
const { productController } = require('../controller');

//ADMIN 상품 전체
router.get('/', productController.getAdminProduct);

//ADMIN 상품 추가
router.post('/add', productController.postProduct);

//ADMIN 상품 이미지 업로드
router.get('/upload', function (req, res) {
  res.render('uploadform');
});
//ADMIN 상품 삭제
router.delete('/delete', productController.delProduct);

//ADMIN 상품 전체 삭제
router.delete('/delete/all', productController.delAllProduct);

//ADMIN 상품 수정
router.put('/edit', productController.putProduct);

module.exports = router;
