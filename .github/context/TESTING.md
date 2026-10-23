# TESTING – reva_designs_server

## Current state (VERIFIED)

- **No tests exist.** `package.json` `"test"` script is `echo "Error: no test specified" && exit 1`.
- No test framework, fixtures, mocks, coverage config, lint config, or formatter config in the repo.
- No CI.

## Available commands (from `package.json`)

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Dev (nodemon) | `npm run dev` |
| Run | `npm start` (`node server.js`) |
| Seed sample products | `npm run seed:products` |
| Test | none (script is a placeholder) |

## Practical validation for a change

1. Syntax: `node --check <changed file>`.
2. Start: needs `MONGODB_URI` (and `JWT_SECRET`) in a local `.env`; start MongoDB locally (README: port 27017). `npm run dev`.
3. Smoke: `GET /health`; exercise changed endpoint via Swagger UI `/api-docs` or curl; for auth, register then call `/auth/me` with the token.
4. If the contract changed, run the frontend (`npm run dev` in `../reva_designs_frontend-main`, port 3001) and exercise the affected page.

## If adding tests (not yet decided)

No convention exists. Do not introduce a framework without asking; if asked, match the CommonJS style, and note it in `DECISION_LOG.md`.
