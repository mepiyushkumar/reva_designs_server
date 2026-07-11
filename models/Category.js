const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    display_order: Number,
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
  { collection: 'Category', timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
