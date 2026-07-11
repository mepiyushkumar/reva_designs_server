const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    page: String,
    product_id: String,
    user_email: String,
    session_id: String,
    city: String,
    country: String,
    device: String,
    referrer: String,
    metadata: mongoose.Schema.Types.Mixed,
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
  { collection: 'UserActivity', timestamps: true }
);

module.exports = mongoose.model('UserActivity', userActivitySchema);
