const { Product } = require('../models');
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
    console.log(keyword, category, sort, page);
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
    // await Product.updateOne({ productId: id }, { $set: updateData });
    const options = { new: true };

    const content = await Product.findOneAndUpdate(
      { productId: id },
      updateData,
      options
    );

    // await content.save();

    return content;
  },
  //상품 이미지 수정
  async updateImg(id, uploadImg) {
    await Product.updateOne({ productId: id }, { imageUrl: uploadImg });
    return `SUCCESS!`;
  },
};
module.exports = productService;
