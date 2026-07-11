const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: String,
    product_image: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
    },
    size: String,
    color: String,
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
      default: Date.now,
    },
    created_by_id: String,
  },
  { collection: 'CartItem', timestamps: true }
);

module.exports = mongoose.model('CartItem', cartItemSchema);
