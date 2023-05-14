const { categoryService } = require('../services');
const asyncHandler = require('../utils/async-handler');
const categoryController = {
  //ADMIN 카테고리 조회
  getCategory: asyncHandler(async (req, res) => {
    const category = await categoryService.readCategory();
    if (!category) {
      return res.status(404).json({ message: '카테고리 내역이 없습니다.' });
    }
    const content = category.map(({ categoryId, category }) => ({
      categoryId,
      category,
    }));
    res.status(200).json(content);
  }),
  //ADMIN 카테고리 추가
  postCategory: asyncHandler(async (req, res) => {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({
        message: '필수 입력값이 누락되었습니다. 값을 전부 입력해주세요.',
      });
    }
    const content = await categoryService.createCategory({ category });
    res.status(200).json(content);
  }),
  //ADMIN 카테고리 수정
  editCategory: asyncHandler(async (req, res) => {
    const { categoryId } = req.query;
    const category = req.body;
    const content = await categoryService.updateCategory(categoryId, category);
    if (!content) {
      return res.status(404).json({
        message: '카테고리가 수정되지 않았습니다. 요청양식을 재확인 해주세요.',
      });
    }
    res.status(200).json('SUCCESS!');
  }),

  //ADMIN 카테고리 삭제
  deleteCategory: asyncHandler(async (req, res) => {
    const { categoryId } = req.query;
    const content = await categoryService.deleteCategory(categoryId);
    res.status(200).json(content);
  }),
};
module.exports = categoryController;
