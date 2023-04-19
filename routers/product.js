const { Router } = require('express');
const router = Router();
const { Product } = require('../models');
const { productController } = require('../controller');

// router.post('/', productController.postProduct);

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send('succeess!' + products);
});

router.post('/', async (req, res, next) => {
  const {
    category,
    thumbnail,
    productName,
    price,
    place,
    speciesAge,
    desciption,
  } = req.body;
  console.log(req.body);
  try {
    const products = await Product.create({
      category,
      thumbnail,
      productName,
      price,
      place,
      speciesAge,
      desciption,
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
