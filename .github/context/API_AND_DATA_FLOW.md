# API AND DATA FLOW – reva_designs_server

Base: `http://localhost:8080` (override `PORT`). Docs: `/api-docs`, `/swagger.json`. Health: `GET /health` -> `{success, message, timestamp}`.

## Endpoint families (VERIFIED: `server.js`, `routes/*`)

### `/entities/<Entity>` for Entity in
`User, StoreSettings, Address, Banner, Category, Collection, Coupon, Newsletter, Order, OrderItem, PaymentSettings, Product, Review, WishlistItem, CartItem, UserActivity`

| Method + path | Handler | Response |
|---|---|---|
| `GET /` `?page&limit&sort` | `getAllRecords` | **bare JSON array** of records (each with `id`); defaults page 1, limit 10, sort `-created_date`. Other query params are ignored |
| `GET /:id` | `getRecordById` | `{success, data}`; 404 `{success:false,message:'Record not found'}` |
| `POST /` | `createRecord` | 201 `{success, message, data}` |
| `PUT /:id` | `updateRecord` | `{success, message, data}`; sets `updated_date` |
| `DELETE /:id` | `deleteRecord` | `{success, message, data}` (raw doc) |
| `POST /bulk` | `bulkCreate` | 201 `{success,message,data[]}` (not on User/PaymentSettings/StoreSettings) |
| `DELETE /bulk` body `{ids}` | `bulkDelete` | `{success,message,data}` |

Errors: `{success:false, message, errors?|error?}` with 400 (cast/validation/duplicate), 404, 500.

### `/auth` (`routes/authRoutes.js`)

| Endpoint | Auth | Body | Response |
|---|---|---|---|
| `POST /auth/register` | no | `{email,password,full_name?,role?}` | 201 `{success,message,token,user:{id,email,full_name,role}}` |
| `POST /auth/login` | no | `{email,password}` | `{success,message,token,user}`; 401 on bad credentials |
| `GET /auth/me` | Bearer | – | `{success,user}` |
| `PUT /auth/me` | Bearer | `{full_name?,password?}` | `{success,message,user}` |
| `POST /auth/forgot-password` | no | `{email}` | `{success,message,resetToken}` (token returned in body) |
| `POST /auth/reset-password` | no | `{resetToken,newPassword}` | `{success,message}` |

JWT payload `{id,email,role}`, expiry 7d (reset token `{id}`, 1h).

## End-to-end flows (frontend -> server)

All frontend calls go through `request()` in `../reva_designs_frontend-main/src/api/base44Client.js`, which: prefixes `API_BASE_URL`, adds Bearer token from `localStorage['reva_designs_token']` when present, parses JSON, unwraps `{success:true,data}` to `data`, maps `_id` -> `id`, throws `Error(message)` with `.status` on non-2xx.

**Login:** `Login.jsx` -> `base44.auth.loginViaEmailPassword` -> `POST /auth/login` -> `User.findOne` + `bcrypt.compare` -> token stored client-side -> full reload to `/` -> `AuthContext` calls `GET /auth/me`.

**Register:** `Register.jsx` -> `POST /auth/register` (`email`, `password` only) -> hash, create User, return token -> client stores token.

**Browse products:** `Shop.jsx` -> `Product.filter({is_active:true, category?, collection?, is_new_arrival?, is_best_selling?}, sort, 50)` -> `GET /entities/Product?is_active=true&...&sort=..&limit=50` -> server returns the first 50 products sorted, **ignoring the filter params**.

**Place order:** `Checkout.jsx` -> `GET /entities/CartItem` (all carts) + `GET /entities/PaymentSettings` -> `POST /entities/Order` (computed totals, `order_number`, `payment_method`, `utr_number` dropped by schema) -> `POST /entities/OrderItem` per cart item -> `DELETE /entities/CartItem/:id` per item. Not transactional; failures mid-way leave partial data.

**Admin order management:** `admin/Orders.jsx` -> `GET /entities/Order?limit=200`; `OrderItem.filter({order_id})` -> `GET /entities/OrderItem?order_id=..` (filter ignored by server, so it returns the 50 most recent OrderItems overall, not those of the selected order); `PUT /entities/Order/:id {status}`.

**Review moderation:** `ProductReviews.jsx` creates `Review {is_approved:false}`; `admin/Reviews.jsx` filters pending/approved and `PUT`s `is_approved:true`.

**Settings:** `StoreSettings` / `PaymentSettings` are read with `list('-created_date', 1)` and updated by id (singleton by convention).

**Analytics:** `lib/trackActivity.js` -> `POST /entities/UserActivity` (fire and forget).

## Contract rules

- Before changing paths, field names/types, enums or response shapes, grep `../reva_designs_frontend-main/src` for the entity (`base44.entities.<Entity>`) and update both sides together, including `entities/<Entity>` schema JSON in the frontend.
- Do not change the list endpoint from a bare array without updating `base44Client.js` (it handles both).
