const { Schema } = require('mongoose');
const shortId = require('./types/short-id');
const ProductSchema = new Schema(
  {
    productId: shortId,
    category: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    place: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    speciesAge: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
ProductSchema.pre('save', function (next) {
  if (this.discount) {
    this.discountPrice =
      Math.floor((this.price * ((100 - this.discount) * 0.01)) / 10) * 10;
  } else {
    this.discountPrice = this.price;
  }
  next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  const update = this._update;

  if (update.discount || update.price) {
    update.discountPrice =
      Math.floor((update.price * ((100 - update.discount) * 0.01)) / 10) * 10;
  }

  next();
});

module.exports = ProductSchema;
