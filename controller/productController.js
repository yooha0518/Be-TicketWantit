const { productService } = require('../services');

//메인 페이지 상품 매핑
function productMapping(items) {
  const content = items.map(
    ({ category, productName, price, imageUrl, productId }) => ({
      category,
      productName,
      price,
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
  async getNewArrivals(req, res, next) {
    try {
      const content = 'success!';
      res.json(content);
    } catch (err) {
      next(err);
    }
  },
  //ADMIN 상품 추가
  async postProduct(req, res, next) {
    try {
      const {
        category,
        imageUrl,
        productName,
        price,
        place,
        speciesAge,
        desciption,
      } = req.body;
      const product = await productService.createProduct({
        category,
        imageUrl,
        productName,
        price,
        place,
        speciesAge,
        desciption,
      });
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
