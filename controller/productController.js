const { productService } = require('../services');

const productController = {
  async postProduct(req, res, next) {
    try {
      const {
        category,
        thumbnail,
        productName,
        price,
        place,
        speciesAge,
        desciption,
      } = req.body;
      const product = await productService.createProduct({
        category,
        thumbnail,
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
  async getProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
