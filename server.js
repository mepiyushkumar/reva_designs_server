require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const setupSwagger = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const storeSettingsRoutes = require('./routes/storeSettingsRoutes');
const addressRoutes = require('./routes/addressRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const couponRoutes = require('./routes/couponRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const paymentSettingsRoutes = require('./routes/paymentSettingsRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistItemRoutes = require('./routes/wishlistItemRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const userActivityRoutes = require('./routes/userActivityRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

// Connect to MongoDB
connectDB();

// Swagger setup
setupSwagger(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
app.use('/auth', authRoutes);

// API Routes
const baseUrl = '/entities';

app.use(`${baseUrl}/User`, userRoutes);
app.use(`${baseUrl}/StoreSettings`, storeSettingsRoutes);
app.use(`${baseUrl}/Address`, addressRoutes);
app.use(`${baseUrl}/Banner`, bannerRoutes);
app.use(`${baseUrl}/Category`, categoryRoutes);
app.use(`${baseUrl}/Collection`, collectionRoutes);
app.use(`${baseUrl}/Coupon`, couponRoutes);
app.use(`${baseUrl}/Newsletter`, newsletterRoutes);
app.use(`${baseUrl}/Order`, orderRoutes);
app.use(`${baseUrl}/OrderItem`, orderItemRoutes);
app.use(`${baseUrl}/PaymentSettings`, paymentSettingsRoutes);
app.use(`${baseUrl}/Product`, productRoutes);
app.use(`${baseUrl}/Review`, reviewRoutes);
app.use(`${baseUrl}/WishlistItem`, wishlistItemRoutes);
app.use(`${baseUrl}/CartItem`, cartItemRoutes);
app.use(`${baseUrl}/UserActivity`, userActivityRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Reva Designs API Server Started      ║
╠════════════════════════════════════════╣
║ Environment: ${NODE_ENV.padEnd(25)} ║
║ Port: ${PORT.toString().padEnd(28)} ║
║ API Base: http://localhost:${PORT}/entities ║
║ Docs: http://localhost:${PORT}/api-docs    ║
╚════════════════════════════════════════╝
  `);
});
