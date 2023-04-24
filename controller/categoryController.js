const { categoryService } = require('../services');
const categoryController = {
  //ADMIN 카테고리 조회
  async getCategory(req, res, next) {
    try {
      const category = await categoryService.readCategory();
      const content = category.map(({ categoryId, category }) => ({
        categoryId,
        category,
      }));
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 카테고리 추가
  async postCategory(req, res, next) {
    try {
      const { category } = req.body;
      const content = await categoryService.createCategory({ category });
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 카테고리 수정
  async editCategory(req, res, next) {
    try {
      const { categoryId } = req.query;
      const category = req.body;
      const content = await categoryService.updateCategory(
        categoryId,
        category
      );
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 카테고리 삭제
  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.query;
      const content = await categoryService.deleteCategory(categoryId);
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  },
};
module.exports = categoryController;
