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
      default: 0,
      validate: {
        validator: function (v) {
          return v === null || (v >= 0 && v <= 100);
        },
      },
    },
    discountPrice: {
      type: Number,
      required: false,
      default: function () {
        if (
          this.discount === null ||
          this.discount === undefined ||
          this.discount === 0
        ) {
          return this.price;
        }
        return (
          Math.floor((this.price * ((100 - this.discount) * 0.01)) / 10) * 10
        );
      },
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

ProductSchema.pre('validate', function (next) {
  if (this.discount === null) {
    this.discount = 0;
  }
  next();
});

ProductSchema.pre('save', function (next) {
  if (this.discount >= 1) {
    this.discountPrice =
      Math.floor((this.price * ((100 - this.discount) * 0.01)) / 10) * 10;
  } else {
    this.discountPrice = this.price;
  }
  next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  const update = this._update;

  if (update.discount >= 1 || update.price) {
    update.discountPrice =
      Math.floor((update.price * ((100 - update.discount) * 0.01)) / 10) * 10;
  }

  next();
});

module.exports = ProductSchema;
