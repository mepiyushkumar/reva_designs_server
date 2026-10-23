# WORKFLOW – how Copilot works in reva_designs_server

## Before implementing

1. Search for an existing implementation (`grep` the entity name across `routes/`, `models/`, and `../reva_designs_frontend-main/src`).
2. Follow the generic-factory pattern in `controllers/genericController.js`; extend it only if every entity benefits.
3. Reuse `middleware/auth.js` for protected endpoints, `errorHandler` for error mapping (throw/`next(err)`; set `err.status` for custom codes).
4. Make the smallest change; check frontend consumers; update both sides when the contract changes.
5. Validate (see `TESTING.md`), update docs in `.github/context/` that the change invalidates.

## Conventions (VERIFIED)

- CommonJS: `const x = require('...')`, `module.exports = ...`. 2-space indent, single quotes, semicolons, trailing commas in multiline literals.
- File names: models `PascalCase.js` (singular), routes `camelCaseRoutes.js`, middleware/config `camelCase.js`.
- Schema style: `type`, `required`, `default` objects; `created_date`/`updated_date` (Date, default `Date.now`), `created_by_id: String`; schema options `{ collection: '<Name>', timestamps: true }`.
- Route files include swagger JSDoc (`@swagger`, `tags: [<Entity>]`, params named `<Entity>_id`).
- Handlers: `async (req,res,next)` with try/catch -> `next(error)` (generic), or inline catch returning `{success:false,message,error}` (auth).
- Response envelope `{success, message?, data?}`.
- Status codes: 201 on create, 400 validation, 401 auth, 404 not found, 500 server.

## Commands

`npm install`, `npm run dev`, `npm start`, `npm run seed:products`. No lint/format/test/build commands exist; do not invent them.

## Anti-patterns / avoid

- Do not add per-entity controllers, services or repositories for plain CRUD; do not add TypeScript, ORMs, or new libraries unprompted.
- Do not rename collections/fields or enums without a data-migration plan and frontend update.
- Do not hardcode secrets or fallback secrets (existing `'your-secret-key'` fallback is a known gap, not a pattern).
- Do not return password hashes; use `.select('-password')` as `/auth/me` does.
- Do not copy `.env` values or tokens into docs, code, or logs.
- Do not "fix" known gaps (`BACKEND.md`) as a drive-by; call them out and ask, because fixing e.g. auth or filtering changes frontend behavior.
- Git: this checkout has no `.git`; never run destructive commands on `node_modules`/data without confirmation. Never drop MongoDB collections. Confirm before running `seed:products` against a shared DB: it upserts by `sku` and backfills default images on any Product with empty `images`.
