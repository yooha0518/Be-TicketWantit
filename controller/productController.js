const { productService } = require('../services');

//메인 페이지 상품 매핑
function productMapping(items) {
  const content = items.map(
    ({ productName, price, startDate, endDate, imageUrl, productId }) => ({
      productName,
      price,
      startDate,
      endDate,
      imageUrl,
      productId,
    })
  );
  return content;
}

const productController = {
  //상품 전체
  async getProduct(req, res, next) {
    try {
      const products = await productService.readProduct();
      const content = productMapping(products);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //상품 카테고리별
  async getCategory(req, res, next) {
    try {
      const { category } = req.query;
      const products = await productService.readCategory(category);
      const content = productMapping(products);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //상품 상세
  async getDetail(req, res, next) {
    try {
      const { productId } = req.query;
      const content = await productService.readDetail(productId);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //NEW_ARRIVAlS
  async getNewArrivals(req, res, next) {
    try {
      const products = await productService.readNewArrivals();
      const content = productMapping(products);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //MD
  async getMDPick(req, res, next) {
    try {
      const products = await productService.readMDPick();
      const content = productMapping(products);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //----------------------------------------- ADMIN----------------------------
  //ADMIN 상품 추가
  async postProduct(req, res, next) {
    try {
      const {
        category,
        imageUrl,
        productName,
        price,
        startDate,
        endDate,
        place,
        speciesAge,
        desciption,
      } = req.body;
      const product = await productService.createProduct({
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
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 삭제
  async delProduct(req, res, next) {
    try {
      const { productId } = req.query;
      const content = await productService.deleteProduct(productId);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 전체 삭제
  async delAllProduct(req, res, next) {
    try {
      const content = await productService.deleteAllProduct();
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 수정
  async putProduct(req, res, next) {
    try {
      const { productId } = req.query;
      const updateData = req.body;
      const content = await productService.updateProduct(productId, updateData);
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
