require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const buildDefaultProductImage = (title, accent, highlight) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#1f2937" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#bg)" rx="28" />
      <rect x="62" y="62" width="676" height="876" rx="24" fill="rgba(255,255,255,0.03)" stroke="${accent}" stroke-width="4" />
      <text x="400" y="410" text-anchor="middle" fill="${highlight}" font-size="74" font-family="Georgia, serif" letter-spacing="7">REVA</text>
      <text x="400" y="485" text-anchor="middle" fill="#fff" font-size="30" font-family="Arial, sans-serif" letter-spacing="3">${title.toUpperCase()}</text>
      <text x="400" y="535" text-anchor="middle" fill="${highlight}" font-size="22" font-family="Arial, sans-serif" letter-spacing="2">DEFAULT PRODUCT IMAGE</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const defaultProductImages = [
  buildDefaultProductImage('Bridal Edit', '#f59e0b', '#fbbf24'),
  buildDefaultProductImage('Festive Wear', '#a78bfa', '#ddd6fe'),
  buildDefaultProductImage('Signature Saree', '#fb7185', '#fecdd3'),
];

const seedProducts = [
  {
    name: 'Bridal Luxe Saree',
    description: 'A graceful bridal saree with rich texture and a premium festive look.',
    price: 2999,
    discount_price: 2499,
    images: [defaultProductImages[0]],
    category: 'Saree',
    collection: 'Bridal Edit',
    fabric: 'Silk Blend',
    color: 'Ivory Gold',
    occasion: 'Wedding',
    sizes: ['S', 'M', 'L'],
    sku: 'BRD-001',
    stock: 12,
    is_featured: true,
    is_new_arrival: true,
    is_best_selling: true,
    tags: ['bridal', 'luxury', 'wedding'],
    material_details: 'Premium silk blend with hand-finished motifs.',
    care_instructions: 'Dry clean recommended.',
    is_active: true,
    created_date: new Date(),
    updated_date: new Date(),
  },
  {
    name: 'Festive Anarkali Set',
    description: 'A statement festive set designed for celebrations and special family occasions.',
    price: 2499,
    discount_price: 1999,
    images: [defaultProductImages[1]],
    category: 'Anarkali',
    collection: 'Festive Edit',
    fabric: 'Georgette',
    color: 'Deep Plum',
    occasion: 'Festive',
    sizes: ['XS', 'S', 'M', 'L'],
    sku: 'FST-002',
    stock: 8,
    is_featured: true,
    is_new_arrival: false,
    is_best_selling: true,
    tags: ['festive', 'anarkali', 'party'],
    material_details: 'Soft georgette with elegant drape.',
    care_instructions: 'Gentle hand wash and steam.',
    is_active: true,
    created_date: new Date(),
    updated_date: new Date(),
  },
  {
    name: 'Signature Cotton Kurti',
    description: 'A comfortable everyday kurti with an elevated handcrafted finish.',
    price: 1299,
    discount_price: 999,
    images: [defaultProductImages[2]],
    category: 'Kurti',
    collection: 'Everyday Luxe',
    fabric: 'Cotton',
    color: 'Sand Beige',
    occasion: 'Daily Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'KUR-003',
    stock: 20,
    is_featured: false,
    is_new_arrival: true,
    is_best_selling: false,
    tags: ['cotton', 'daily wear', 'classic'],
    material_details: 'Breathable cotton with smooth finish.',
    care_instructions: 'Machine wash cold, gentle cycle.',
    is_active: true,
    created_date: new Date(),
    updated_date: new Date(),
  },
];

const seedDefaultProducts = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined. Add it to your server environment before running this script.');
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const operations = seedProducts.map((product) => ({
    updateOne: {
      filter: { sku: product.sku },
      update: {
        $setOnInsert: {
          ...product,
          created_date: new Date(),
          updated_date: new Date(),
        },
      },
      upsert: true,
    },
  }));

  const result = await Product.bulkWrite(operations);

  await Product.updateMany(
    { images: { $exists: true, $eq: [] } },
    { $set: { images: [defaultProductImages[0]] } }
  );

  console.log(`Seed complete. Upserted: ${result.upsertedCount}, matched: ${result.matchedCount}.`);
};

seedDefaultProducts()
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exit(1);
  })
  .finally(() => {
    mongoose.disconnect();
  });
