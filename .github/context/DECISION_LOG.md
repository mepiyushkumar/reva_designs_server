# DECISION LOG – reva_designs_server

No Git history is available in this checkout, so dates below are the context-creation date (2026-10-23) and reasons are not verifiable. Entries describe the *observed* design.

## 2026-10-23 - Generic CRUD controller factory for all entities
Context: 16 entities need the same operations.
Decision: `controllers/genericController.js` exports `(Model) => handler` factories reused by every router.
Reason: Unknown from repository evidence.
Affected Areas: `controllers/`, all `routes/*Routes.js`.
Status: Active
Evidence: `routes/productRoutes.js`, `routes/couponRoutes.js`.

## 2026-10-23 - Entity URL shape and response format mimic a hosted-BaaS SDK
Context: Frontend uses a client named `base44` (`@base44/sdk`, `@base44/vite-plugin` in its `package.json`) with `entities.<Name>.list/get/filter/create/update/delete`.
Decision: Server exposes `/entities/<Name>` with `created_date`/`updated_date`/`created_by_id` fields and bare-array list responses.
Reason: Unknown from repository evidence; ⚠ NEEDS HUMAN VERIFICATION (inferred: this server replaces a Base44 backend while keeping the client API).
Affected Areas: whole API contract.
Status: Active
Evidence: `server.js` `baseUrl = '/entities'`; `../reva_designs_frontend-main/src/api/base44Client.js`.

## 2026-10-23 - Own JWT auth instead of third-party
Decision: `/auth/*` with bcryptjs + JWT (7d), token kept in browser `localStorage`.
Reason: Unknown from repository evidence.
Affected Areas: `routes/authRoutes.js`, `middleware/auth.js`, frontend `AuthContext`.
Status: Active (OTP/email verification not implemented; register comment says "no OTP needed for dev").

## 2026-10-23 - Explicit collection names; relations by string id
Decision: `{collection:'<Name>'}` on each schema (`Users` for User); cross-entity links are string fields, no refs.
Reason: Unknown from repository evidence (likely to match pre-existing collection names ⚠ NEEDS HUMAN VERIFICATION).
Status: Active

## 2026-10-23 - Large JSON body limit (20mb)
Decision: `bodyParser.json({limit:'20mb'})`.
Reason: Inferred, not verified: frontend uploads images as base64 data URLs stored in documents (`base44Client.js` `UploadFile`, `Product.images`).
Status: Active
