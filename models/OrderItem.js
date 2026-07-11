const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_image: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: String,
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
  { collection: 'OrderItem', timestamps: true }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);
