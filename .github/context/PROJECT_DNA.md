# PROJECT DNA – reva_designs_server

**What it is:** A thin, generic CRUD REST API plus email/password JWT auth backing the Reva Designs storefront and admin panel (Indian ethnic wear: sarees, anarkalis, kurtis; prices in ₹).

## Stack (VERIFIED: `package.json`, source)

| Item | Value |
|---|---|
| Runtime / language | Node.js, JavaScript (CommonJS). No TypeScript, no build step |
| Framework | Express `^4.18.2` |
| DB / ODM | MongoDB via Mongoose `^7.0.0` |
| Auth | `jsonwebtoken` (7d tokens), `bcryptjs` (cost 10) |
| API docs | `swagger-jsdoc` + `swagger-ui-express` at `/api-docs`, spec at `/swagger.json` |
| Other | `cors` (open), `body-parser` (20mb limit), `dotenv` |
| Dev tooling | `nodemon` only. No ESLint, Prettier, tests, Docker, CI |
| Package manager | npm (`package-lock.json`) |

## Layout

```
server.js                 entry: middleware, routes, listen
config/database.js        mongoose.connect(MONGODB_URI)
config/swagger.js         swagger-jsdoc over ./routes/*.js
controllers/genericController.js   CRUD handler factories (Model) => handler
middleware/auth.js        JWT Bearer verification (used only on /auth/me routes)
middleware/errorHandler.js  Mongoose/Mongo error mapping
models/<Entity>.js        16 Mongoose schemas
routes/<entity>Routes.js  16 routers + authRoutes.js
scripts/seed-default-products.js   npm run seed:products
```

## Runtime config

- Env vars read: `MONGODB_URI` (required, `process.exit(1)` on connect failure), `JWT_SECRET`, `PORT` (default 8080), `NODE_ENV`. README example uses `mongodb://localhost:27017/reva-designs-v2`.
- No `.env` file is committed (`.gitignore` excludes it).

## Relationships to other systems

- Sole consumer: `../reva_designs_frontend-main` (React/Vite). It calls `VITE_SERVER_API_URL` (fallback `http://localhost:8080`).
- No external integrations (no email, payments gateway, storage, or queues) are present in this repo.
- No Git history is available in this checkout (not a git repository).
- No deployment manifests (Dockerfile, CI/CD, Kubernetes) exist.
