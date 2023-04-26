const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { productController } = require('../controller');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
// const upload = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images');
//   },
// });
//ADMIN 상품 전체
router.get('/', productController.getAdminProduct);

//ADMIN 상품 추가
router.post('/add', upload.single('imageUrl'), productController.postProduct);

//ADMIN 상품 삭제
router.delete('/delete', productController.delProduct);

//ADMIN 상품 전체 삭제
router.delete('/delete/all', productController.delAllProduct);

//ADMIN 상품 수정
router.put('/edit', upload.single('imageUrl'), productController.putProduct);

module.exports = router;
