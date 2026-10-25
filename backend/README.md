# Backend API

Express API for the complaint form in `frontend/`. Complaint records are stored in MongoDB; uploaded evidence files are kept in `backend/uploads/` and are not publicly served.

## Setup

Requirements: Node.js 20.19+ and a MongoDB database.

```sh
npm ci
cp .env.example .env
```

Set `MONGODB_URI` in `.env`, then run `npm run dev`. The API listens on port `4000` by default. The Vite frontend proxies `/api` requests to it.

## Endpoints

- `GET /api/health` — API health status.
- `POST /api/complaints` — accepts the form as `multipart/form-data`, with evidence files under `attachments` (up to 5 files, 10 MB each; videos up to 5 MB).

Successful submissions return a complaint reference number. Validation errors return HTTP 400 with an `error` message.

This backend currently supports complaint submission only. It does not include an admin interface, authentication, email notifications, or cloud file storage.
