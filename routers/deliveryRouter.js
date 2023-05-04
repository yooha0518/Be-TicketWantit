const { Router } = require('express');
const deliveryRouter = Router();
const { adminOrderController } = require('../controller');

deliveryRouter.put('/:orderId', adminOrderController.putOrder);

module.exports = deliveryRouter;
