const mongoose = require('mongoose');

const paymentSettingsSchema = new mongoose.Schema(
  {
    payments_enabled: Boolean,
    upi_id: String,
    upi_name: String,
    bank_name: String,
    account_name: String,
    account_number: String,
    ifsc_code: String,
    branch: String,
    cod_enabled: Boolean,
    upi_enabled: Boolean,
    bank_enabled: Boolean,
    qr_image: String,
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
  { collection: 'PaymentSettings', timestamps: true }
);

module.exports = mongoose.model('PaymentSettings', paymentSettingsSchema);
