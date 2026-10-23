# FRONTEND – (not in this repository)

This repository is backend only. The consumer is the sibling React/Vite app at `../reva_designs_frontend-main`; see its `.github/context/FRONTEND.md`.

What matters for server work:
- Client: `../reva_designs_frontend-main/src/api/base44Client.js` (fetch wrapper, token in `localStorage['reva_designs_token']`, `Authorization: Bearer`).
- Base URL: `VITE_SERVER_API_URL` or `http://localhost:8080`.
- It unwraps `{success:true,data}` and normalizes `_id` -> `id`; contract details in `API_AND_DATA_FLOW.md`.
