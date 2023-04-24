const { Category } = require('../models');
const categoryService = {
  //카테고리 추가
  async createCategory({ category }) {
    const content = await Category.create({
      category,
    });
    return content;
  },
  //카테고리 조회
  async readCategory() {
    const content = await Category.find({});
    return content;
  },
  //카테고리 수정
  async updateCategory(id, category) {
    await Category.updateOne({ categoryId: id }, { $set: category });
    return `categoryId: [${id}] UPDATE SUCCESS!`;
  },

  //카테고리 삭제
  async deleteCategory(id) {
    await Category.deleteOne({ categoryId: id });
    return `categoryId: [${id}] DELETE SUCCESS!`;
  },
};
module.exports = categoryService;
