const { Product } = require('../models');
const { RecommandedProduct } = require('../models');
const productService = {
  //전체 상품
  async readProduct(sort, page) {
    const products = await this.sortingAndPaging(null, null, sort, page);
    return products;
  },
  //카테고리별 상품
  async readCategoryProduct(category, sort, page) {
    const products = await this.sortingAndPaging(null, category, sort, page);
    return products;
  },
  //상품 검색
  async searchProduct(keyword, sort, page) {
    const products = await this.sortingAndPaging(keyword, null, sort, page);
    return products;
  },

  //상품 정렬 및 페이징 처리 함수
  async sortingAndPaging(keyword, category, sort, page) {
    const pageSize = 12;
    const currentPage = page || 1;
    const skip = (currentPage - 1) * pageSize;
    let query = {};
    if (keyword) {
      query = {
        productName: { $regex: new RegExp(`${keyword}`, 'i') },
      };
    } else if (category) {
      query = {
        category,
      };
    }
    const sortOptions = {
      new: { _id: -1 },
      max_price: { discountPrice: -1, productName: 1 },
      min_price: { discountPrice: 1, productName: 1 },
      discount: { discount: -1, productName: 1 },
    };
    const sortOption = sortOptions[sort] || sortOptions.new;
    const result = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    return result;
  },

  //상품 상세
  async readDetail(id) {
    const product = await Product.findOne({ productId: id });
    return product;
  },
  //NEW_ARRIVAlS
  async readNewArrivals() {
    const products = await Product.find().sort({ _id: -1 }).limit(6);
    return products;
  },
  //MD추천
  async readMDPick() {
    const products = await RecommandedProduct.find({});

    return products;
  },

  //------------------------------------ADMIN------------------------------
  //ADMIN 상품 전체
  async adminReadProduct(page) {
    const limit = 10;
    const startPage = (page - 1) * limit;
    const endPage = page * limit;
    const total = await Product.countDocuments();

    const resultPage = await Product.find({})
      .sort({ _id: -1 })
      .skip(startPage)
      .limit(limit);

    const pageInfo = {
      currentPage: page,
      totalPage: Math.ceil(total / limit),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: endPage < total ? page + 1 : null,
    };
    return { pageInfo, resultPage };
  },
  //상품 추가
  async createProduct({
    category,
    productName,
    price,
    discount,
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
      discount,
      startDate,
      endDate,
      place,
      speciesAge,
      imageUrl,
      description,
    });
    return `SUCCESS`;
  },
  //추천 상품 저장 API
  async createRecommadedProduct(ids) {
    //기존 데이터 삭제 후
    await RecommandedProduct.deleteMany({});
    // 들어온 데이터 다시 저장
    const products = await Product.find({ productId: { $in: ids } });
    const recommandsProducts = products.map((product) => {
      return new Product({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        discount: product.discount,
        discountPrice: product.discountPrice,
        startDate: product.startDate,
        endDate: product.endDate,
        imageUrl: product.imageUrl,
      });
    });
    const result = await RecommandedProduct.insertMany(recommandsProducts);

    return result;
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
    discount,
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
      discount,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    };

    const options = { new: true };

    const content = await Product.findOneAndUpdate(
      { productId: id },
      updateData,
      options
    );

    return content;
  },
  //상품 이미지 수정
  async updateImg(id, uploadImg) {
    await Product.updateOne({ productId: id }, { imageUrl: uploadImg });
    return `SUCCESS!`;
  },
};
module.exports = productService;
