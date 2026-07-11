const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: String,
    product_image: String,
    price: Number,
    discount_price: Number,
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
  { collection: 'WishlistItem', timestamps: true }
);

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
