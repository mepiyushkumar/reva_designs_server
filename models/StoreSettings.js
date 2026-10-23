const mongoose = require('mongoose');

const storeSettingsSchema = new mongoose.Schema(
  {
    address: String,
    phone: String,
    email: String,
    whatsapp: String,
    instagram: String,
    newsletter_email_enabled: {
      type: Boolean,
      default: true,
    },
    newsletter_phone_enabled: {
      type: Boolean,
      default: true,
    },
    about_home_title: String,
    about_home_subtitle: String,
    about_story_heading: String,
    about_story_text: String,
    about_story_image: String,
    about_founder_name: String,
    about_founder_role: String,
    about_founder_desc: String,
    about_founder_name_2: String,
    about_founder_role_2: String,
    about_founder_desc_2: String,
    about_mission: String,
    about_vision: String,
    about_promise: String,
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
  { collection: 'StoreSettings', timestamps: true }
);

module.exports = mongoose.model('StoreSettings', storeSettingsSchema);
