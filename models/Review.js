const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    reviewer_name: String,
    is_approved: {
      type: Boolean,
      default: false,
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
  { collection: 'Review', timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
