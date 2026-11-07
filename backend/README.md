# Backend API

Express API for the complaint form in `frontend/`. Complaint records are stored in MongoDB; evidence files are stored in Cloudinary and their URLs and identifiers are saved with each complaint.

## Setup

Requirements: Node.js 20.19+ and a MongoDB database.

```sh
npm ci
cp .env.example .env
```

Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_REGISTRATION_CODE`, the three Cloudinary values, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and `ADMIN_EMAIL` in `.env`, then run `npm run dev`. Get Cloudinary credentials from its dashboard and create an API key and verified sender in Brevo. `ADMIN_EMAIL` is where complaint notifications are sent. The API listens on port `4000` by default. The Vite frontend proxies `/api` requests to it.

## Endpoints

- `GET /api/health` — API health status.
- `POST /api/complaints` — accepts the form as `multipart/form-data`, with evidence files under `attachments` (up to 5 files, 10 MB each; videos up to 5 MB). Files upload to the `amu-complaints` Cloudinary folder, and Brevo emails the complaint details to `ADMIN_EMAIL`. Files within Brevo's attachment size and type limits are attached; other files are included as Cloudinary links. The response includes `notificationSent` so the frontend can report if the admin email could not be sent.
- `GET /api/complaints/track/:complaintNumber` — public status lookup for a submitted complaint.
- `POST /api/admin/auth/register` — admin registration with `ADMIN_REGISTRATION_CODE`.
- `POST /api/admin/auth/login` — admin login. Returns a JWT token.
- `GET /api/admin/auth/me` — validates token and returns admin profile.
- `GET /api/admin/complaints` — protected admin endpoint for dashboard listing.
- `PATCH /api/admin/complaints/:id` — protected admin endpoint for status updates.
- `GET /api/admin/stats` — protected admin dashboard metrics.

Successful submissions return a complaint reference number. Validation errors return HTTP 400 with an `error` message.

All `/api/admin/*` dashboard routes require `Authorization: Bearer <token>` from the login endpoint.
