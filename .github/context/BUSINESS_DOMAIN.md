# BUSINESS DOMAIN – reva_designs_server

Domain: single-store online boutique for Indian ethnic wear. All entities below are Mongoose models in `models/` (VERIFIED). **Business rules are mostly enforced by the frontend, not the server** (see "Where rules live").

## Entities (collection name in parentheses)

| Entity | Key fields (required*) | Notes |
|---|---|---|
| User (`Users`) | `email*` unique lowercase, `full_name*`, `role` enum `admin\|user` (default `user`), `password` | Created via `/auth/register` (hashed) |
| Product (`Product`) | `name*`, `price*`, `discount_price`, `images[]`, `category`, `collection`, `fabric`, `color`, `occasion`, `sizes[]`, `sku`, `stock`(0), `is_featured`, `is_new_arrival`, `is_best_selling`, `tags[]`, `material_details`, `care_instructions`, `is_active`(true) | `category`/`collection` are free strings matching Category/Collection `name` |
| Category | `name*`, `slug*` unique, `description`, `image`, `is_active`, `display_order` | Drives storefront nav |
| Collection | `name*`, `slug*`, `description`, `banner_image`, `is_active`, `is_featured`, `display_order` | |
| Banner | `title*`, `image*`, `subtitle`, `cta_text`, `cta_link`, `display_order`, `is_active` | Home hero |
| Order | `order_number*` unique, `total*`, `status` enum, `payment_status` enum, `subtotal`, `discount`, `shipping_address` (string), `items_count`, `tracking_number`, `customer_name/email/phone`, `coupon_code`, `notes` | |
| OrderItem | `order_id*`, `product_id*`, `product_name*`, `price*`, `quantity*`, `product_image`, `size` | Snapshot of product at purchase; links by string id |
| CartItem | `product_id*`, `quantity*`, `product_name`, `product_image`, `price`, `size`, `color` | **No user/session field** |
| WishlistItem | `product_id*`, `product_name`, `product_image`, `price`, `discount_price` | **No user field** |
| Address | `address_line1*`, `city*`, `state*`, `pincode*`, `name`, `phone`, `address_line2`, `is_default` | No `user_id` field |
| Coupon | `code*` unique, `type*` enum `percentage\|flat`, `value*`, `expiry_date*`, `min_order`, `max_uses`, `used_count`(0), `is_active` | |
| Review | `product_id*`, `rating*` (1–5), `comment`, `reviewer_name`, `is_approved` (default false) | Moderated |
| Newsletter | `email` unique+sparse lowercase (optional), `phone`, `is_subscribed` (true) | Subscriber may have email, phone, or both. Also the WhatsApp/email broadcast list |
| PaymentSettings | `payments_enabled`, `cod_enabled`, `upi_enabled`, `bank_enabled`, `upi_id`, `upi_name`, `qr_image`, `bank_name`, `account_name`, `account_number`, `ifsc_code`, `branch` | Single-record "settings" pattern |
| StoreSettings | `address`, `phone`, `email`, `whatsapp`, `instagram`, `newsletter_email_enabled`/`newsletter_phone_enabled` (default true; footer signup fields), many `about_*` content fields | Single-record pattern. ⚠ NEEDS HUMAN VERIFICATION: admin page sends `about_hero_*`/`about_founder1_*`/`about_founder2_*` but the model defines `about_home_*`/`about_founder_*`/`about_founder_*_2`, so those admin fields are dropped on save |
| UserActivity | `event*`, `page`, `product_id`, `user_email`, `session_id`, `city`, `country`, `device`, `referrer`, `metadata` (Mixed) | Analytics events (e.g. `product_view`) |

All models also have `created_date`, `updated_date`, `created_by_id` plus Mongoose `timestamps` (`createdAt/updatedAt`).

## State enums (VERIFIED in `models/Order.js`)

- `Order.status`: `pending -> confirmed -> packed -> shipped -> delivered`, or `cancelled`. No transition enforcement on the server; the admin UI (`src/pages/admin/Orders.jsx`) sets any value via a select.
- `Order.payment_status`: `pending | paid | refunded`.
- `Review.is_approved`: false until admin approves (`src/pages/admin/Reviews.jsx`).

## Where rules live (VERIFIED)

| Rule | Location |
|---|---|
| Order number `RVD-` + last 6 digits of `Date.now()` | Frontend `src/pages/Checkout.jsx` |
| Subtotal/discount/total computation, free shipping | Frontend `Checkout.jsx` |
| Coupon validation (active, `min_order`, percentage vs flat) | Frontend `Checkout.jsx`; `expiry_date`, `max_uses`, `used_count` are **not** enforced or updated anywhere |
| Payment methods: COD, UPI, bank transfer (UTR number required for UPI/bank) | Frontend `Checkout.jsx` driven by `PaymentSettings` flags |
| Stock | Stored on Product; never decremented or checked |
| Review moderation | Frontend admin page; public pages request `is_approved: true` (but server list filtering is not implemented, see `BACKEND.md` gap 2) |
| Role `admin` | Stored on User; no route or UI guard found enforcing it |
| Unique constraints | Mongoose `unique` (User.email, Category.slug, Coupon.code, Newsletter.email, Order.order_number) |

## UNKNOWN / not in repo

Payment verification, shipping rates, tax, inventory policy, email/WhatsApp delivery, returns process (the UI only states "7-day returns"), admin bootstrap process (how the first `admin` is created). ⚠ NEEDS HUMAN VERIFICATION.
