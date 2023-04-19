const { Product } = require('../models');

const productService = {
  //상품 추가
  async createProduct({
    category,
    thumbnail,
    productName,
    price,
    place,
    speciesAge,
    desciption,
  }) {
    const createdProduct = await Product.create({
      category,
      thumbnail,
      productName,
      price,
      place,
      speciesAge,
      desciption,
    });
    return createdProduct;
  },
  async readProduct() {
    const content = await Product.find({});
    return content;
  },
};
module.exports = productService;
