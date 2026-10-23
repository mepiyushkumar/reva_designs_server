# BACKEND – reva_designs_server

## Technology (VERIFIED)

Node + Express 4 + Mongoose 7, CommonJS. Entry `server.js`. No logging library (`console.log/error`), no caching, no messaging, no schedulers/background jobs, no DI container.

## Files and responsibilities

| Path | Responsibility |
|---|---|
| `server.js` | App wiring, route mounts under `/entities/<Entity>` and `/auth`, `/health`, 404, error handler, `listen(PORT||8080)` |
| `config/database.js` | `mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser, useUnifiedTopology})`; exits on failure |
| `config/swagger.js` | OpenAPI 3.0 spec from JSDoc in `./routes/*.js`; defines `BearerAuth` scheme |
| `controllers/genericController.js` | Factories `(Model) => (req,res,next)`: `getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkUpdate, bulkDelete, updateMany, deleteMany, restore` (last three + `bulkUpdate` are exported but not mounted by the routes inspected; `restore` is a stub) |
| `middleware/auth.js` | Reads `Authorization: Bearer <jwt>`, `jwt.verify(token, JWT_SECRET)`, sets `req.user = {id,email,role}`; 401 otherwise |
| `middleware/errorHandler.js` | `CastError`->400 "Invalid ID format"; `ValidationError`->400 `errors[]`; Mongo 11000->400 "<field> already exists"; else status/500; adds `error: err` only when `NODE_ENV==='development'` |
| `routes/authRoutes.js` | Inline handlers: `POST /auth/register`, `POST /auth/login`, `GET /auth/me` (auth), `PUT /auth/me` (auth), `POST /auth/forgot-password`, `POST /auth/reset-password` |
| `routes/<entity>Routes.js` | Mount generic handlers + swagger docs |
| `models/*.js` | Schemas (see `BUSINESS_DOMAIN.md`) |
| `scripts/seed-default-products.js` | Idempotent: upserts sample products by `sku` (`$setOnInsert`), then sets a default SVG data-URI image on any Product whose `images` is an empty array (this `updateMany` touches existing real products too) |

## Entity route pattern (copy this)

Every entity router (e.g. `routes/productRoutes.js`, `routes/couponRoutes.js`):

```js
const Model = require('../models/<Entity>');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');
/** @swagger ... */
router.get('/', getAllRecords(Model));      router.post('/', createRecord(Model));
router.post('/bulk', bulkCreate(Model));    router.delete('/bulk', bulkDelete(Model));  // declared before '/:id'
router.get('/:id', getRecordById(Model));   router.put('/:id', updateRecord(Model));    router.delete('/:id', deleteRecord(Model));
```

`PaymentSettings`, `StoreSettings`, `User` routers have no `/bulk` routes (verified by route grep). Mounted in `server.js` as ``${'/entities'}/<Entity>``.

## How to add a backend feature

**New entity**
1. `models/<Entity>.js` with `{ collection: '<Entity>', timestamps: true }`, plus `created_date`, `updated_date` (Date, default `Date.now`) and `created_by_id: String` like every existing model.
2. `routes/<entity>Routes.js` copied from the pattern above, with swagger JSDoc (tag = entity).
3. `require` + `app.use(`${baseUrl}/<Entity>`, ...)` in `server.js`.
4. Frontend: add `<Entity>: createEntityApi('<Entity>')` in `../reva_designs_frontend-main/src/api/base44Client.js` and an `entities/<Entity>` schema JSON there.

**New field on existing entity**: add to the model; mirror it in the frontend `entities/<Entity>` JSON and the form that sends it. Unknown fields sent by clients are silently dropped by Mongoose strict mode (see Known gaps).

**Custom (non-CRUD) endpoint**: put it in the entity router or `authRoutes.js` style inline handler with its own try/catch returning `{success:false,message}`; reuse `middleware/auth.js` for protection. Add swagger JSDoc.

## Conventions (VERIFIED in multiple files)

- snake_case field names; `is_*` booleans; `*_id` string references; money as `Number`.
- Responses: `{ success, message?, data? }`, except list endpoint (bare array) and auth endpoints (`token`, `user` at top level).
- IDs: Mongo `_id`; `serializeRecord` adds `id` (string) on create/get/update/list responses (not on delete).
- `updateRecord` forces `updated_date = new Date()` and `runValidators: true, new: true`.
- Error handling: generic handlers delegate to `next(error)`; auth routes catch and return 500 with `error.message`.

## Known gaps (VERIFIED by reading code — raise, don't silently change)

1. **No authorization on `/entities/*`.** Anyone can read/create/update/delete any entity (users, orders, payment settings). `middleware/auth.js` is only used by `GET/PUT /auth/me`. No role check exists anywhere.
2. **List endpoint ignores filters.** `getAllRecords` only reads `page`, `limit`, `sort` and calls `Model.find()` with no query. The frontend's `.filter({...})` sends filter params that are ignored (e.g. `is_active`, `category`, `product_id`, `order_id`, `code`), so filtering is not applied server-side.
3. **Default limit 10** when `limit` is omitted (frontend usually passes a limit; `CartItem.list()` in `Navbar.jsx` passes none).
4. **`User` entity leaks and mishandles passwords.** `GET /entities/User` returns full documents including the bcrypt hash; `POST/PUT /entities/User` store whatever `password` is sent unhashed.
5. **Forgot-password returns the reset token in the response** (comment says remove in production); no email sending.
6. **JWT secret fallback mismatch.** `authRoutes.js` signs/verifies with `JWT_SECRET || 'your-secret-key'`; `middleware/auth.js` uses `JWT_SECRET` only. With `JWT_SECRET` unset, `/auth/me` fails with 401 even for valid tokens.
7. **`register` accepts `role` from the request body** (self-service admin).
8. **No validation** beyond Mongoose; no rate limiting, helmet, or password policy. `cors()` allows all origins.
9. Mutating generic endpoints `bulkUpdate/updateMany/deleteMany` accept arbitrary filters/updates (exported; mount carefully).
10. `models/Product.js` defines a field named `collection`; Mongoose logs "`collection` is a reserved schema pathname and may break some functionality" at startup/seed (observed 2026-10-23). Works so far, but is a risk.
11. Order schema lacks `payment_method` and `utr_number`, which the frontend sends in `Checkout.jsx`; strict mode drops them.
12. `Coupon.expiry_date` is `required`, but the admin coupon form (`src/pages/admin/Coupons.jsx`) does not send it, so creation would fail validation ⚠ NEEDS HUMAN VERIFICATION (not executed).
13. Server does not enforce stock, coupon limits (`used_count` never incremented anywhere), pricing, or order totals.
14. Frontend client calls `/auth/verify-otp` and `/auth/resend-otp` which do not exist on the server (the current UI does not use them).
