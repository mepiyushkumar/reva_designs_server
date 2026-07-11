const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    image: {
      type: String,
      required: true,
    },
    cta_text: String,
    cta_link: String,
    display_order: Number,
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
  { collection: 'Banner', timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
