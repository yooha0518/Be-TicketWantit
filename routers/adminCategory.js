const { Router } = require('express');
const router = Router();
const { categoryController } = require('../controller');

//ADNIM 카테고리 조회
router.get('/', categoryController.getCategory);

//ADNIM 카테고리 추가
router.post('/add', categoryController.postCategory);

//ADMIN 카테고리 수정
router.put('/edit', categoryController.editCategory);

//ADNIM 카테고리 삭제
router.delete('/delete', categoryController.deleteCategory);

module.exports = router;
