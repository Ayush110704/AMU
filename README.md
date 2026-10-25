# AMU

This repository is organized into separate application areas:

- `frontend/` contains the React and Vite application.
- `backend/` contains the Express API, MongoDB complaint model, and private local evidence storage.

## Run the frontend

```sh
cd frontend
npm ci
npm run dev
```

## Run the backend

Use Node.js 20.19+ and MongoDB. Start a local MongoDB instance or create a MongoDB Atlas database, then configure the backend:

```sh
cd backend
npm ci
cp .env.example .env
# Set MONGODB_URI in .env to your MongoDB connection string.
npm run dev
```

The frontend proxies `/api` requests to `http://localhost:4000`. Complaint evidence is stored under `backend/uploads/` and is not served publicly.
