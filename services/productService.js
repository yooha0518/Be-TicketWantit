const { Product } = require('../models');

const productService = {
  //상품 목록 확인
  async readProduct() {
    const products = await Product.find({});
    return products;
  },
  // 상품 카테고리별
  async readCategory(categoryName) {
    const products = await Product.find({ category: categoryName });
    return products;
  },
  //상품 상세
  async readDetail(id) {
    const product = await Product.findOne({ productId: id });
    return product;
  },
  //상품 추가
  async createProduct({
    category,
    imageUrl,
    productName,
    price,
    place,
    speciesAge,
    desciption,
  }) {
    const products = await Product.create({
      category,
      imageUrl,
      productName,
      price,
      place,
      speciesAge,
      desciption,
    });
    return products;
  },
};
module.exports = productService;
