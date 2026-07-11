# Reva Designs Server

Complete Express.js server for Reva Designs e-commerce platform with MongoDB database and Swagger documentation.

## Features

- ✅ **16 Entity Models** with MongoDB
- ✅ **CRUD Operations** for all entities
- ✅ **Bulk Operations** (Create, Update, Delete)
- ✅ **Swagger/OpenAPI Documentation** with interactive UI
- ✅ **Error Handling** middleware
- ✅ **CORS** enabled for frontend integration
- ✅ **Pagination** support on list endpoints
- ✅ **Environment Configuration** with .env file

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Ensure MongoDB is running:**
```bash
# On Windows
mongod

# On Mac/Linux
mongod --dbpath /path/to/db
```

3. **Start the server:**
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8080`

## API Documentation

### Swagger UI
Access the interactive API documentation at:
```
http://localhost:8080/api-docs
```

### Base URL
```
http://localhost:8080/entities
```

## Available Endpoints

### Entities
- `User` - User management
- `StoreSettings` - Store configuration
- `Address` - Customer addresses
- `Product` - Product catalog
- `Category` - Product categories
- `Collection` - Product collections
- `Banner` - Homepage banners
- `Order` - Customer orders
- `OrderItem` - Order line items
- `CartItem` - Shopping cart items
- `WishlistItem` - Wishlist items
- `Review` - Product reviews
- `Coupon` - Discount coupons
- `Newsletter` - Newsletter subscriptions
- `PaymentSettings` - Payment configuration
- `UserActivity` - User activity tracking

### Common Operations

**List all records:**
```bash
GET /entities/{Entity}?page=1&limit=10&sort=-created_date
```

**Get single record:**
```bash
GET /entities/{Entity}/{id}
```

**Create record:**
```bash
POST /entities/{Entity}
Body: { /* entity data */ }
```

**Update record:**
```bash
PUT /entities/{Entity}/{id}
Body: { /* updated data */ }
```

**Delete record:**
```bash
DELETE /entities/{Entity}/{id}
```

**Bulk operations:**
```bash
POST /entities/{Entity}/bulk - Create multiple
DELETE /entities/{Entity}/bulk - Delete multiple
```

## Database Models

### User
- email (unique)
- full_name
- role (admin | user)
- password
- timestamps

### Product
- name
- description
- price
- discount_price
- images (array)
- category
- collection
- fabric, color, occasion
- sizes (array)
- stock
- is_featured, is_new_arrival, is_best_selling
- tags (array)

### Order
- order_number (unique)
- status (pending, confirmed, packed, shipped, delivered, cancelled)
- total, subtotal, discount
- shipping_address
- payment_status
- customer details
- timestamps

### Address
- name, phone
- address_line1, address_line2
- city, state, pincode
- is_default (boolean)
- timestamps

### Category & Collection
- name
- description
- image/banner_image
- slug
- is_active, is_featured
- display_order
- timestamps

### Coupon
- code (unique)
- type (percentage | flat)
- value
- min_order, max_uses
- expiry_date
- is_active
- timestamps

### Review
- product_id
- rating (1-5)
- comment
- reviewer_name
- is_approved
- timestamps

### Newsletter
- email (unique)
- phone
- is_subscribed
- timestamps

### PaymentSettings
- payments_enabled
- upi_id, upi_name, qr_image
- bank details (name, account, IFSC, branch)
- cod_enabled, upi_enabled, bank_enabled
- timestamps

### UserActivity
- event, page
- product_id
- user_email, session_id
- city, country, device
- referrer
- metadata
- timestamps

## Configuration (.env)

```env
MONGODB_URI=mongodb://localhost:27017/reva-designs-v2
JWT_SECRET=your-secret-key-change-in-production
PORT=8080
NODE_ENV=development
```

## Project Structure

```
server/
├── config/
│   ├── database.js          # MongoDB connection
│   └── swagger.js           # Swagger configuration
├── controllers/
│   └── genericController.js  # Reusable CRUD operations
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   ├── Collection.js
│   ├── Address.js
│   ├── Banner.js
│   ├── CartItem.js
│   ├── Coupon.js
│   ├── Newsletter.js
│   ├── OrderItem.js
│   ├── PaymentSettings.js
│   ├── Review.js
│   ├── StoreSettings.js
│   ├── UserActivity.js
│   └── WishlistItem.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── addressRoutes.js
│   ├── bannerRoutes.js
│   ├── categoryRoutes.js
│   ├── collectionRoutes.js
│   ├── cartItemRoutes.js
│   ├── couponRoutes.js
│   ├── newsletterRoutes.js
│   ├── orderItemRoutes.js
│   ├── paymentSettingsRoutes.js
│   ├── reviewRoutes.js
│   ├── storeSettingsRoutes.js
│   ├── userActivityRoutes.js
│   └── wishlistItemRoutes.js
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
└── server.js               # Main server file
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* entity or array of entities */ },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": { /* error details in development */ }
}
```

## Pagination

All list endpoints support pagination with query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (default: -created_date)

Example:
```bash
GET /entities/Product?page=2&limit=20&sort=-price
```

## Running in Production

1. Change environment variables:
```env
NODE_ENV=production
JWT_SECRET=your-strong-secret-key
```

2. Build and start:
```bash
npm start
```

## Testing the API

Use tools like:
- **Postman** - Import endpoints or use Swagger integration
- **Insomnia** - REST client
- **cURL** - Command line
- **Thunder Client** - VS Code extension

Example cURL:
```bash
curl -X POST http://localhost:8080/entities/Product \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample Product","price":999,"stock":10}'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify MongoDB is listening on port 27017

### Port Already in Use
- Change PORT in .env file or use: `PORT=3000 npm run dev`

### CORS Errors
- CORS is enabled for all origins by default
- Modify in server.js if needed: `app.use(cors({ origin: 'http://localhost:3000' }))`

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **body-parser** - Request body parsing
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **swagger-ui-express** - Swagger UI
- **swagger-jsdoc** - Swagger documentation generation

## License

ISC

## Support

For issues or questions, contact the development team.
