const { Product } = require('../models');

const productService = {
  //상품 목록 전체
  async readProduct() {
    const products = await Product.find({});
    return products;
  },
  //상품 검색
  async searchProduct(keyword) {
    const searchProduct = await Product.find({
      productName: { $regex: new RegExp(`${keyword}`, 'i') },
    });
    if (searchProduct.length === 0) {
      return {
        error: {
          message: `'${keyword}' 해당 상품은 존재하지 않습니다.`,
          status: 404,
        },
      };
    }
    return { searchProduct: searchProduct };
  },
  // 상품 카테고리별
  async readCategoryProduct(categoryName) {
    const products = await Product.find({ category: categoryName });
    if (products.length === 0) {
      return {
        error: {
          message: `'${categoryName}' 해당 카테고리는 존재하지 않습니다.`,
          status: 404,
        },
      };
    }
    return { products: products };
  },
  //상품 상세
  async readDetail(id) {
    const product = await Product.findOne({ productId: id });
    if (!product) {
      return {
        error: {
          message: `'${id}' 해당 상품 아이디는 존재하지 않습니다. 상품 아이디 재확인 부탁드립니다.`,
          status: 404,
        },
      };
    }
    return { products: product };
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
  //ADMIN 상품 전체
  async adminReadProduct() {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return products;
  },
  //상품 추가
  async createProduct({
    category,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    imageUrl,
    description,
  }) {
    await Product.create({
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      imageUrl,
      description,
    });
    return `SUCCESS`;
  },
  //상품 삭제
  async deleteProduct(id) {
    await Product.deleteOne({ productId: id });

    return `SUCCESS!`;
  },
  //상품 전체 삭제
  async deleteAllProduct() {
    await Product.deleteMany({});
    return `SUCCESS!`;
  },
  //상품 수정 추가 API
  async updateReviseProduct(
    id,
    category,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    description,
    imageUrl
  ) {
    const updateData = {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
      imageUrl,
    };
    await Product.updateOne({ productId: id }, { $set: updateData });
    return `SUCCESS!`;
  },
  //상품 수정
  async updateProduct(
    id,
    category,
    productName,
    price,
    startDate,
    endDate,
    place,
    speciesAge,
    description
  ) {
    const updateData = {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    };
    await Product.updateOne({ productId: id }, { $set: updateData });
    return `SUCCESS!`;
  },
  //상품 이미지 수정
  async updateImg(id, uploadImg) {
    await Product.updateOne({ productId: id }, { imageUrl: uploadImg });
    return `SUCCESS!`;
  },
};
module.exports = productService;
