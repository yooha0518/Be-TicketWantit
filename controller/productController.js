const { Product } = require('../models');
const { productService } = require('../services');
const asyncHandler = require('../utils/async-handler');
const Domain = 'https://ticketwantit.shop:5000/';

//메인 페이지 상품 매핑
function productMapping(items) {
  const content = items.map(
    ({
      productName,
      price,
      discount,
      discountPrice,
      startDate,
      endDate,
      imageUrl,
      productId,
      _id,
    }) => ({
      productName,
      price,
      discount,
      discountPrice,
      startDate,
      endDate,
      imageUrl,
      productId,
      _id,
    })
  );
  return content;
}

const productController = {
  //상품 전체
  getProduct: asyncHandler(async (req, res) => {
    const { sort, page } = req.query;
    const products = await productService.readProduct(sort, page);
    const content = productMapping(products);
    if (!content) {
      return res.status(404).json({ message: '등록된 상품이 없습니다.' });
    }
    res.status(200).json(content);
  }),
  //상품 카테고리별
  getCategoryProduct: asyncHandler(async (req, res) => {
    const { category, sort, page } = req.query;
    const products = await productService.readCategoryProduct(
      category,
      sort,
      page
    );
    if (!products) {
      return res
        .status(404)
        .json({ message: '해당 카테고리에 등록된 상품이 없습니다.' });
    }
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //상품 검색 API
  getSearch: asyncHandler(async (req, res) => {
    const { keyword, sort, page } = req.query;
    if (!keyword) {
      return res.status(204).json({ message: '검색어를 입력해주세요.' });
    }
    const result = await productService.searchProduct(keyword, sort, page);
    if (!result) {
      return res.status(404).json([]);
    }
    const content = productMapping(result);
    res.status(200).json(content);
  }),

  //상품 상세
  getDetail: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const content = await productService.readDetail(productId);
    if (!content) {
      return res.status(404).json({
        message: '요청하신 상품 아이디는 등록된 상품이 없습니다.',
      });
    }

    res.status(200).json(content);
  }),
  //NEW_ARRIVAlS
  getNewArrivals: asyncHandler(async (req, res) => {
    const products = await productService.readNewArrivals();
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //MD
  getMDPick: asyncHandler(async (req, res) => {
    const products = await productService.readMDPick();
    if (!products) {
      return res
        .status(404)
        .json({ message: '추천 상품으로 등록된 상품이 없습니다.' });
    }
    const content = productMapping(products);
    res.status(200).json(content);
  }),
  //----------------------------------------- ADMIN----------------------------
  //ADMIN 상품 전체
  getAdminProduct: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const result = await productService.adminReadProduct(page);
    if (!result.resultPage) {
      return res.status(404).json({ message: '등록된 상품이 없습니다.' });
    }
    const content = result.resultPage.map(
      ({
        category,
        productId,
        productName,
        imageUrl,
        price,
        discount,
        discountPrice,
        place,
        speciesAge,
        description,
        startDate,
        endDate,
      }) => ({
        category,
        productId,
        productName,
        imageUrl,
        price,
        discount,
        discountPrice,
        place,
        speciesAge,
        description,
        startDate,
        endDate,
      })
    );
    res.status(200).json({ pageInfo: result.pageInfo, data: content });
  }),
  //ADMIN 상품 추가
  postProduct: asyncHandler(async (req, res) => {
    const imageUrl = Domain + req.file.filename;
    const {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      discount,
      speciesAge,
      description,
    } = req.body;
    if (
      !category ||
      !productName ||
      !price ||
      !speciesAge ||
      !startDate ||
      !endDate ||
      !place ||
      !description
    ) {
      return res.status(400).json({
        message: '필수 입력값이 누락되었습니다. 값을 전부 입력해주세요.',
      });
    }
    const products = await productService.createProduct({
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      discount,
      speciesAge,
      imageUrl,
      description,
    });
    res.status(200).json(products);
  }),
  //md recommanded 상품 저장 API
  postRecommendedProduct: asyncHandler(async (req, res) => {
    const { productIds } = req.body;
    if (productIds.length > 6) {
      return res.status(400).json({
        message: '추천 상품은 6개 이하로 등록할 수 있습니다.',
      });
    }
    const content = await productService.createRecommadedProduct(productIds);

    res.status(200).json(content);
  }),
  //ADMIN 상품 삭제
  delProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const content = await productService.deleteProduct(productId);
    res.status(200).json(content);
  }),
  //ADMIN 상품 전체 삭제
  delAllProduct: asyncHandler(async (req, res) => {
    const content = await productService.deleteAllProduct();
    res.status(200).json(content);
  }),
  //ADMIN 상품 수정 추가 API
  reviseProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const imageUrl = Domain + req.file.filename;
    const {
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    } = req.body;
    const content = await productService.updateReviseProduct(
      productId,
      category,
      productName,
      price,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
      imageUrl
    );
    res.status(200).json(content);
  }),
  //ADMIN 상품 수정
  putProduct: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const {
      category,
      productName,
      price,
      discount,
      startDate,
      endDate,
      place,
      speciesAge,
      description,
    } = req.body;

    const content = await productService.updateProduct(
      productId,
      category,
      productName,
      price,
      discount,
      startDate,
      endDate,
      place,
      speciesAge,
      description
    );
    if (!content) {
      return res.status(404).json({
        message: '상품이 수정되지 않았습니다. 요청양식을 재확인 해주세요.',
      });
    }
    res.status(200).json(content);
  }),
  //ADMIN 상품 이미지 수정
  putImg: asyncHandler(async (req, res) => {
    const { productId } = req.query;
    const imageUrl = Domain + req.file.path;
    const content = await productService.updateImg(productId, imageUrl);
    res.status(200).json(content);
  }),
};

module.exports = productController;
