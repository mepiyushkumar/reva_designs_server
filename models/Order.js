const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    total: {
      type: Number,
      required: true,
    },
    subtotal: Number,
    discount: Number,
    shipping_address: String,
    items_count: Number,
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    tracking_number: String,
    customer_name: String,
    customer_email: String,
    customer_phone: String,
    coupon_code: String,
    notes: String,
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
  { collection: 'Order', timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
