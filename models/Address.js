const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address_line1: {
      type: String,
      required: true,
    },
    address_line2: String,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    is_default: Boolean,
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
  { collection: 'Address', timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
