const { Product } = require('../models');

const productService = {
  //상품 목록 확인
  async readProduct() {
    console.log(Product);
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
  //NEW_ARRIVAlS
  async readNewArrivals() {
    const products = await Product.find().sort({ startDate: -1 }).limit(6);
    return products;
  },
  //MD추천
  async readMDPick() {
    const products = await Product.aggregate([{ $sample: { size: 6 } }]);
    return products;
  },

  //------------------------------------ADMIN------------------------------
  //상품 추가
  async createProduct({
    category,
    imageUrl,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    desciption,
  }) {
    const products = await Product.create({
      category,
      imageUrl,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      desciption,
    });
    return products;
  },
  //상품 삭제
  async deleteProduct(id) {
    await Product.deleteOne({ productId: id });

    return `productId: '${id}' DELETE SUCCESS!`;
  },
  //상품 전체 삭제
  async deleteAllProduct() {
    await Product.deleteMany({});
    return 'COMPLETE DELECTION OF ALL!';
  },
};
module.exports = productService;
