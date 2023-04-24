const { Schema } = require('mongoose');
const short_id = require('./types/short-id');

const CategorySchema = new Schema({
  categoryId: short_id,
  category: {
    type: String,
    required: true,
  },
});
module.exports = CategorySchema;
