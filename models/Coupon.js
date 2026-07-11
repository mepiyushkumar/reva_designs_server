const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['percentage', 'flat'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    min_order: Number,
    max_uses: Number,
    used_count: {
      type: Number,
      default: 0,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
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
  { collection: 'Coupon', timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
