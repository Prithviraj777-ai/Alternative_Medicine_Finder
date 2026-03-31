# Alternative_Medicine_Finder

A full-stack MERN application to search medicines and discover cheaper alternatives by matching salt composition.

## Tech Stack
- Frontend: React + Vite + Axios
- Backend: Node.js + Express + Mongoose
- Database: MongoDB

## Quick Start
1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Create `backend/.env`:
   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/alternative_medicine_finder
   PORT=5000
   ```
3. Seed sample data:
   ```bash
   npm --prefix backend run seed
   ```
4. Run backend and frontend in separate terminals:
   ```bash
   npm run dev:backend
   npm run dev:frontend
   ```

## Key Features
- Case-insensitive medicine search
- Medicine details page
- Alternative finder by same salt composition
- Price-sorted alternatives and cheapest highlight
- Smart suggestions (top 5)
- Category filter and pagination
- Comparison table and mode
- Recent searches in localStorage
- Responsive UI
- Basic backend and frontend tests


### UI Preview Without Backend (Mock Mode)
If you want to preview the UI quickly without running MongoDB/Express, run frontend in mock mode:
```bash
cd frontend
VITE_USE_MOCK=true npm run dev
```
This uses local sample medicine data from `frontend/src/services/mockData.js`.
