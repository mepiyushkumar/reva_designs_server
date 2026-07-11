const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    discount_price: Number,
    images: [String],
    category: String,
    collection: String,
    fabric: String,
    color: String,
    occasion: String,
    sizes: [String],
    sku: String,
    stock: {
      type: Number,
      default: 0,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_new_arrival: {
      type: Boolean,
      default: false,
    },
    is_best_selling: Boolean,
    tags: [String],
    material_details: String,
    care_instructions: String,
    is_active: {
      type: Boolean,
      default: true,
    },
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
  { collection: 'Product', timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
