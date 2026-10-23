# SESSION JOURNAL – reva_designs_server

Keep short. Move durable facts to the permanent context files.

## 2026-10-23 – Initial context genesis
- Read all of `server.js`, `config/`, `controllers/`, `middleware/`, `routes/authRoutes.js`, representative entity routes, all 16 models, seed script, README.
- Cross-checked against frontend usage (`base44Client.js`, Checkout, admin pages).
- Environment: `npm i` done; no `.env` file present; no git repo; no tests.

## Open items / follow-ups (not started)
- Decide whether to add server-side filtering for list endpoints (frontend relies on it; see `BACKEND.md` gap 2).
- Decide on auth/role middleware for `/entities/*` and password handling on `/entities/User`.
- Verify: Product `collection` field vs Mongoose reserved names; Coupon `expiry_date` required vs admin form; Order `payment_method`/`utr_number` missing from schema.
- Confirm how the first admin user is created.
- Consider adding `.env.example` (none exists).
