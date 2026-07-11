const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    banner_image: String,
    slug: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_featured: Boolean,
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
  { collection: 'Collection', timestamps: true }
);

module.exports = mongoose.model('Collection', collectionSchema);
